import { 
    connectDatabase, 
    findDocumentsByQueryObject 
} from '@/utils/mongo-utils'

export default async function handler(req, res) {
    const { user } = req.query
    console.log('the user', user)
    const client = await connectDatabase()
    const queryObject = {
        productCreator: user
    }

    const products = await findDocumentsByQueryObject(client, 'products', queryObject)

    res.status(200).json(products)
}