import connect from '../../lib/connect'
import Tags from '../../models/tags'

export default async function handler(req, res) {
    try {
        connect();
        const q_tags = await Tags.find({}).lean();
        res.status(200).json({ tags: q_tags })
    }
    catch (e) {
        console.error(e)
        res.status(500).json({ message: e })
    }
}