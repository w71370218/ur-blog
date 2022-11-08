import connect from "../../../lib/connect";
import findRecord from "../../../lib/record/findRecord";
import updateRecord from "../../../lib/record/updateRecord";
import Posts from "../../../models/posts";
import Tags from "../../../models/tags";
import Users from "../../../models/users";
import Series from "../../../models/series";
import mongoose from "mongoose";

connect();

export default async function handler(req, res) {
    try {
        const { id, title, content, tags, series, user, coverImage, alt, changedImage, imgur_url, deletehash } = req.body;
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
                        updatedTime: now_time
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

        const filter = { id: id };
        let post = await Posts.findOne(filter)
        const author = await Users.findOne({ _id: post.author }).select("id").lean();
        if (author.id != user) {
            res.status(500).json({ message: "沒有權限可以更改" });
        }

        await Posts.updateOne(filter, {
            title: title,
            content: content,
            updatedTime: now_time,
            tags: post_tags,
            "series.id": post_series,
        }, { setDefaultsOnInsert: true });

        if (changedImage && coverImage && coverImage !== null && coverImage !== '') {
            post.cover = {
                url: imgur_url,
                alt: alt,
                deleteHash: deletehash
            }
            if (!alt || alt === null || alt === '') {
                post.cover.alt = title;
            }
        }
        else if (changedImage && (!coverImage || coverImage === null || coverImage === '')) {
            post.cover = undefined;
        }
        else if (!changedImage && (alt && alt !== null && alt !== '')) {
            post.cover.alt = alt;
        }

        await post.save();

        res.status(200).json({ message: "succeed", id: post.id })
    }
    catch (e) {
        console.error(e)
        res.status(500).json({ message: e });
    }
}