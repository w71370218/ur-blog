import connect from "../../../lib/connect";
import Series from "../../../models/series"
import findRecord from "../../../lib/record/findRecord";
import updateRecord from "../../../lib/record/updateRecord";
import mongoose from "mongoose";

connect();

export default async function handler(req, res) {
    try {
        const { name, description } = req.body;
        var now_time = new Date().toString();

        let seriesRecord = await findRecord("series")
        const series_q = {
            _id: new mongoose.Types.ObjectId(),
            id: ++seriesRecord.count,
            name: name,
            description: description,
            createdTime: now_time,
            updatedTime: now_time,
        }
        const series = new Series(
            series_q,
            { runValidators: true }
        )
        await series.save();
        updateRecord(seriesRecord)

        res.status(200).json({ message: "succeed", id: series.id })
    }
    catch (e) {
        console.error(e)
        res.status(500).json({ message: e });
    }
}