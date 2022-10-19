import connect from "../../../lib/connect";
import Posts from "../../../models/posts";
import clientPromise from "../../../lib/mongodb";
import Tags from "../../../models/tags";
import Users from "../../../models/users";
import mongoose from "mongoose";

connect();

export default async function handler(req, res) {
    try {
        const { id, title, content, tags, user } = req.body;
        var now_time = new Date().toString();

        let tagRecord = await findRecord("tags")
        const post_tags = []
        for (let index = 0; index < tags.length; index++) {
            const tagExist = await Tags.findOne({ name: tags[index] });
            if (!tagExist) {
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
        updateRecord(tagRecord);

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
            tags: post_tags
        });

        await post.save();

        res.status(200).json({ message: "succeed", id: post.id })
    }
    catch (e) {
        console.error(e)
        res.status(500).json({ message: e });
    }
}

const findRecord = async (category) => {

    const mongoClient = await clientPromise

    const db = mongoClient.db("ur-blog");
    const records = db.collection("records");

    var myquery = { name: category };
    const result = await records.findOne(myquery);
    return result
}

const updateRecord = async (record) => {
    const mongoClient = await clientPromise

    const db = mongoClient.db("ur-blog");
    const records = db.collection("records");


    var now_time = new Date().toString();
    var newvalues = { $set: { count: record.count, updateTime: now_time } };
    records.updateOne({ name: record.name }, newvalues, function (err, res) {
        if (err) throw err;
        console.log(`Record: ${record.name} document updated`);
    });
}