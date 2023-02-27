import { connectDatabase, getAllDocuments} from '../../../utils/mongo-utils'
import _ from 'lodash'

export default async function handler(req, res) {
    const client = await connectDatabase()

    const data = await getAllDocuments(client, 'base-products')
    const groupedData = _.groupBy(data, 'category')

    res.status(200).json(groupedData)

}