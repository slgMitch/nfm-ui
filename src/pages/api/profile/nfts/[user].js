import { connectDatabase, findDocumentsByQueryObject } from '../../../../utils/mongo-utils'

export default async function handler(req, res) {
        const { user } = req.query
        const client = await connectDatabase()
        const queryObject = {
            user
        }
        const userNfts = await findDocumentsByQueryObject(client, 'nfts', queryObject)
        const nfts = userNfts ? userNfts : []
    
        res.status(200).json(nfts)
}