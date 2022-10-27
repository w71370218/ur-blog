import connect from "../../../lib/connect";
import Posts from "../../../models/posts";
import findRecord from "../../../lib/record/findRecord";
import updateRecord from "../../../lib/record/updateRecord";
import Tags from "../../../models/tags";
import Users from "../../../models/users";
import Series from "../../../models/series"
import mongoose from "mongoose";

connect();

export default async function handler(req, res) {
    try {
        const { title, content, tags, series, author } = req.body;
        var now_time = new Date().toString();

        let post_series;
        if (series !== '' && series) {
            const seriesExist = await Series.findOne({ name: series });
            if (seriesExist) {
                post_series = mongoose.Types.ObjectId(seriesExist._id)
            }
            else {
                let seriesRecord = await findRecord("series")
                const new_series = new Series(
                    {
                        id: ++seriesRecord.count,
                        name: series,
                        description: '',
                        createdTime: now_time,
                        updatedTime: now_time
                    }
                )
                await new_series.save()
                updateRecord(seriesRecord);
                post_series = mongoose.Types.ObjectId(new_series._id)
            }
        }

        let tagRecord;
        const post_tags = []
        let c_newtag = false
        for (let index = 0; index < tags.length; index++) {
            const tagExist = await Tags.findOne({ name: tags[index] });
            if (!tagExist) {
                if (!c_newtag) {
                    tagRecord = await findRecord("tags")
                    c_newtag = true
                }
                const tag = new Tags(
                    {
                        id: ++tagRecord.count,
                        name: tags[index],
                        updatedTime: now_time,
                        createdTime: now_time
                    }
                )
                await tag.save();
                post_tags.push(mongoose.Types.ObjectId(tag._id))

            } else {
                post_tags.push(mongoose.Types.ObjectId(tagExist._id));
            }
        };
        if (c_newtag) {
            updateRecord(tagRecord);
        }

        const user = await Users.findOne({ id: author });
        let postRecord = await findRecord("posts")
        const post_q = {
            _id: new mongoose.Types.ObjectId(),
            id: ++postRecord.count,
            title: title,
            content: content,
            author: mongoose.Types.ObjectId(user._id),
            updatedTime: now_time,
            publishedTime: now_time,
            tags: post_tags,
            access: "any",
            "series.id": post_series

        }
        const post = new Posts(
            post_q,
            { runValidators: true }
        )
        await post.save();
        updateRecord(postRecord)

        res.status(200).json({ message: "succeed", id: post.id })
    }
    catch (e) {
        console.error(e)
        res.status(500).json({ message: e });
    }
}