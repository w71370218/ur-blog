import connect from "../../../lib/connect";
import Posts from "../../../models/posts";
import Users from "../../../models/users";
import Series from "../../../models/series"

connect();

export default async function handler(req, res) {
    try {
        const { id, user } = req.body;
        var now_time = new Date().toString();

        const filter = { id: id };
        const series = await Series.findOne(filter)

        let posts = await Posts.find({ $or: [{ "series.id": series }] })
        for (let i = 0; i < posts.length; i++) {
            const author = await Users.findOne({ _id: posts[i].author }).select("id").lean();
            if (author.id != user) {
                break;
            }
            posts[i].series = null
            posts[i].updatedTime = now_time;
            await posts[i].save()
        }

        await Series.deleteOne(filter);

        res.status(200).json({ message: "succeed" })
    }
    catch (e) {
        console.error(e)
        res.status(500).json({ message: e });
    }
}