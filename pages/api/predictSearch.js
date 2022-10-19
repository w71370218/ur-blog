import connect from '../../lib/connect';
import Tags from '../../models/tags';
import Series from '../../models/series';

connect();

export default async function handler(req, res) {
    try {
        const schema = req.body.schema;
        switch (schema) {
            case "tags":
                const tags = await Tags.find({}).select('name').lean();
                res.status(200).json(tags)
                break;
            case "series":
                const series = await Series.find({}).select('name').lean();
                res.status(200).json(series)
                break;
        }
    }
    catch (e) {
        console.error(e)
        res.status(500).json({ message: e })
    }
}