import connect from '../../lib/connect';
import Posts from '../../models/posts';
import Tags from '../../models/tags';
import Users from '../../models/users';
import Series from '../../models/series';

connect();

export default async function handler(req, res) {
    try {
        const user = req.body.user;
        const r_query = req.body.query;
        let series;
        let query;
        if (r_query) {
            query = { $or: [] }
            if (r_query.hasOwnProperty("series.id")) {
                series = await Series.findOne({ _id: r_query["series.id"] }).lean();
                query["$or"].push({ "series.id": series });
            }
        } else {
            query = {};
        }
        console.log(query)

        const postsQ = await Posts.find(query)
            .sort({ 'id': -1 })
            .lean();

        //console.log(postsQ)
        const posts = [];
        for (let i = 0; i < postsQ.length; i++) {
            postsQ[i]._id = postsQ[i]._id.toString();
            postsQ[i].content = postsQ[i].content.replace(/!\[](.+)/g, ' ').substring(0, 300);
            //author
            const author = await Users.findOne({ _id: postsQ[i].author }).select('id username').lean();
            author._id = author._id.toString();
            postsQ[i].author = author;

            //tags
            for (let j = 0; j < postsQ[i].tags.length; j++) {
                const tag = await Tags.findOne({ _id: postsQ[i].tags[j] }).select('id name').lean();
                tag._id = tag._id.toString()
                postsQ[i].tags[j] = tag;
            }
            // series
            if (series) {
                postsQ[i].series.id = series;
                postsQ[i].series.id._id = postsQ[i].series.id._id.toString()
            }
            else {
                if (postsQ[i].hasOwnProperty("series.id")) {
                    series = await Series.findOne({ _id: postsQ[i]["series.id"] }).lean();
                    postsQ[i]["series.id"] = series;
                    postsQ[i].series.id._id = postsQ[i].series.id._id.toString();
                }
            }

            //access
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

        let post_list = posts;
        if (Object.keys(query).length === 0) {
            post_list = post_list.slice(0, 5)
        }
        res.status(200).json(post_list)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: e })
    }

}