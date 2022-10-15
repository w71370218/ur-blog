import connect from '../../lib/connect';
import Posts from '../../models/posts';
import Tags from '../../models/tags';
import Users from '../../models/users';

connect();

export default async function handler(req, res) {
    try {
        const posts = await Posts.find({}).sort({ 'publishedTime': -1 }).lean();
        for (let i = 0; i < posts.length; i++) {
            posts[i]._id = posts[i]._id.toString();
            const author = await Users.findOne({ _id: posts[i].author }).select('id username').lean();
            author._id = author._id.toString();
            posts[i].author = author;
            for (let j = 0; j < posts[i].tags.length; j++) {
                const tag = await Tags.findOne({ _id: posts[i].tags[j] }).select('id name').lean();
                tag._id = tag._id.toString()
                posts[i].tags[j] = tag;
            }

        }

        res.status(200).json(posts)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: e })
    }

}