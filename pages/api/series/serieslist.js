import connect from '../../../lib/connect';
import Series from '../../../models/series';
import Posts from '../../../models/posts';
import Users from '../../../models/users'
connect();

export default async function handler(req, res) {
    try {
        const seriesQ = await Series.find({}).sort({ 'id': -1 }).lean();
        const series = [];
        const user = req.body.user
        for (let i = 0; i < seriesQ.length; i++) {
            seriesQ[i]._id = seriesQ[i]._id.toString();
            const postsQ = await Posts.find({ $or: [{ "series.id": seriesQ[i] }] }).lean();
            //console.log(postsQ)

            const posts = []
            for (let j = 0; j < postsQ.length; j++) {
                //access
                if (user) {
                    //if (postsQ[i].access != "self") {
                    const author = await Users.findOne({ _id: postsQ[j].author });
                    if ((user.id === author.id && postsQ[j].access === "self") || postsQ[j].access === "any") {

                        posts.push(postsQ[j])
                    }
                }
                else {
                    if (postsQ[j].access === "any") {
                        posts.push(postsQ[j])
                    }
                }
            }

            seriesQ[i].postCount = posts.length;

            series.push(seriesQ[i])
        }
        res.status(200).json(series)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: e })
    }

}