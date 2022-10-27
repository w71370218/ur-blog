import connect from "../../../lib/connect";
import Series from "../../../models/series"

connect();

export default async function handler(req, res) {
    try {
        const { id, name, description } = req.body;
        var now_time = new Date().toString();
        const series_q = {
            name: name,
            description: description,
            updatedTime: now_time,
        }
        const filter = { id: id };
        let series = await Series.findOne(filter)
        await Posts.updateOne(filter, series_q, { setDefaultsOnInsert: true })

        await series.save();

        res.status(200).json({ message: "succeed", id: series.id })
    }
    catch (e) {
        console.error(e)
        res.status(500).json({ message: e });
    }
}