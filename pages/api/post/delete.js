import connect from "../../../lib/connect";
import Posts from "../../../models/posts";
import Users from "../../../models/users";

connect();

export default async function handler(req, res) {
    try {
        const { id, user } = req.body;
        var now_time = new Date().toString();

        const filter = { id: id };
        let post = await Posts.findOne(filter)
        const author = await Users.findOne({ _id: post.author }).select("id").lean();
        if (author.id != user) {
            res.status(500).json({ message: "沒有權限可以更改" });
        }

        await Posts.deleteOne(filter);

        res.status(200).json({ message: "succeed" })
    }
    catch (e) {
        console.error(e)
        res.status(500).json({ message: e });
    }
}