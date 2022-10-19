import connect from '../../lib/connect';
import Posts from '../../models/posts';
import Tags from '../../models/tags';
import Users from '../../models/users';

connect();

export default async function handler(req, res) {
    try {
        const user = req.body.user;
        const postsQ = await Posts.find({}).sort({ 'id': -1 }).lean();
        const posts = [];
        for (let i = 0; i < postsQ.length; i++) {
            postsQ[i]._id = postsQ[i]._id.toString();
            const author = await Users.findOne({ _id: postsQ[i].author }).select('id username').lean();
            author._id = author._id.toString();
            postsQ[i].author = author;
            for (let j = 0; j < postsQ[i].tags.length; j++) {
                const tag = await Tags.findOne({ _id: postsQ[i].tags[j] }).select('id name').lean();
                tag._id = tag._id.toString()
                postsQ[i].tags[j] = tag;
            }
            if (user) {
                //if (postsQ[i].access != "self") {
                if ((user.id === author.id && postsQ[i].access === "self") || postsQ[i].access === "any") {
                    posts.push(postsQ[i])
                }
            }
            else {
                if (postsQ[i].access === "any") {
                    posts.push(postsQ[i])
                }
            }
        }
        res.status(200).json(posts)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: e })
    }

}