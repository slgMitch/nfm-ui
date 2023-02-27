import { removeBackgroundFromImageUrl } from 'remove.bg';
import { S3 } from 'aws-sdk';
import btoa from 'btoa';

import { 
    connectDatabase, 
    insertDocuments,
    findDocumentsByQueryObject 
} from '@/utils/mongo-utils'

export default async function handler(req, res) {
        try {
            const client = await connectDatabase()
            const body = JSON.parse(req.body)
            const { user, savedNfts, newNfts, removeImageBackgrounds } = body
            let notSavedTokens = []
            let tokensToSave = []
            let savedNoBGNfts = savedNfts.filter(savedNft => !savedNft.token_id.includes("-noBG"))
            let newNoBGNfts = newNfts.filter(newNft => !newNft.token_id.includes("-noBG"))
            for(let newNoBGNft of newNoBGNfts) {
                const alreadySaved = savedNoBGNfts.find(savedNoBGNft => savedNoBGNft.token_id === newNoBGNft.token_id)
                if(!alreadySaved) {
                    newNoBGNft.user = user
                    notSavedTokens.push(newNoBGNft)
                    tokensToSave.push(newNoBGNft)
                }
            }

            if(removeImageBackgrounds) {
                const s3 = new S3({
                    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
                });
                for(let notSavedToken of notSavedTokens) {
                    const imageData = {
                        url: notSavedToken.metadata.image,
                        tokenId: notSavedToken.token_id,
                        tokenSymbol: notSavedToken.symbol
                    }
    
                    const newImage = await removeBackgroundFromImageUrl({
                        url: imageData.url,
                        apiKey: process.env.REMOVEBG_API_KEY,
                        size: "regular",
                        type: "auto"
                    })
    
    
                    const imageBuffer = Buffer.from(newImage.base64img, 'base64')
        
                    const params = {
                        Bucket: process.env.S3_IMAGE_BUCKET,
                        Key: `no-background/${imageData.tokenSymbol}-${imageData.tokenId}.jpg`,
                        Body: imageBuffer,
                        ContentEncoding: 'base64',
                        ContentType: 'image/jpeg'
                    }
    
                    s3.putObject(params, function(err, data) {
                        if(err) {
                            throw err;
                        }
                    })
                    const bucketOptions = {
                        bucket: process.env.S3_IMAGE_BUCKET,
                        key: `no-background/${imageData.tokenSymbol}-${imageData.tokenId}.jpg`
                    }
                    const stringRequest = JSON.stringify(bucketOptions)
                    const encRequest = btoa(stringRequest)
                    
                    const cdnUrl = `${process.env.AWS_CDN_API_BASE}/${encRequest}`
    
                    let nftWithNoBackground = {
                        ...notSavedToken,
                        metadata: {
                            ...notSavedToken.metadata
                        }
                    } 
                    nftWithNoBackground.metadata.image = cdnUrl
                    nftWithNoBackground.metadata.name = `${nftWithNoBackground.metadata.name} - No Background`
                    nftWithNoBackground.token_id = `${nftWithNoBackground.token_id}-noBG`
        
                    tokensToSave.push(nftWithNoBackground)
                }
            } else {
                tokensToSave = notSavedTokens
            }
    
            await insertDocuments(client, 'nfts', tokensToSave)
            
            const queryObject = { user }
            const userNfts = await findDocumentsByQueryObject(client, 'nfts', queryObject)
    
            res.status(200).json(userNfts)
        } catch(error) {
            console.log('error', error)
            res.status(400).json(error)
        }
        
}