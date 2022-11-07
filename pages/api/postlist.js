import connect from '../../lib/connect';
import Posts from '../../models/posts';
import Tags from '../../models/tags';
import Users from '../../models/users';
import Series from '../../models/series';

connect();

export default async function handler(req, res) { //user, query
    try {
        const user = req.body.user
        const postNum = req.body.postNum
        const req_allPostNum = req.body.allPostNum

        let allPostCount = req_allPostNum;
        let r_query;
        let series;
        if (req.body.query) {
            const query = req.body.query
            r_query = { $or: [] }
            if (query.hasOwnProperty("series.id")) {
                series = await Series.findOne({ id: query["series.id"] }).lean();
                r_query["$or"].push({ "series.id": series });
            }
        } else {
            r_query = {};
        }
        let allPostNum;
        let skip_postNum;

        const count = await Posts.countDocuments(r_query)
        allPostNum = count
        skip_postNum = postNum + (allPostNum - req_allPostNum)

        let postsQ = await Posts.find(r_query)
            .skip(skip_postNum)
            //.limit(3)
            .sort({ 'id': -1 })
            .lean();



        const posts = [];
        for (let i = 0; i < postsQ.length; i++) {
            //author
            const author = await Users.findOne({ _id: postsQ[i].author }).select('id username').lean();
            author._id = author._id.toString();
            postsQ[i].author = author;
            //access
            if (user) {
                if ((user.id === author.id && postsQ[i].access === "self") || postsQ[i].access === "any") {
                    posts.push(postsQ[i])
                } else {
                    allPostCount--;
                    continue;
                }
            }
            else {
                if (postsQ[i].access === "any") {
                    posts.push(postsQ[i])
                } else {
                    allPostCount--;
                    continue;
                }
            }


            //post
            postsQ[i]._id = postsQ[i]._id.toString();
            postsQ[i].content = postsQ[i].content.replace(/!\[](.+)/g, ' ')
                .replace(/<video.+<\/video>/g, ' ')
                .substring(0, 300);

            //tags
            for (let j = 0; j < postsQ[i].tags.length; j++) {
                const tag = await Tags.findOne({ _id: postsQ[i].tags[j] }).select('id name').lean();
                tag._id = tag._id.toString()
                postsQ[i].tags[j] = tag;
            }
            // series
            if (postsQ[i].series && postsQ[i].series !== null) {
                if (series) {
                    postsQ[i].series = series;
                    postsQ[i].series._id = postsQ[i].series._id.toString()
                }
                else {
                    if (postsQ[i].series.hasOwnProperty("id")) {
                        series = await Series.findOne({ _id: postsQ[i].series.id }).lean();
                        postsQ[i].series = series;
                        postsQ[i].series._id = postsQ[i].series._id.toString();
                    }
                }
            }


            if (Object.keys(r_query).length === 0 && posts.length == 2) {
                break;
            }

        }

        let post_list = posts;



        //return { posts: post_list }
        res.status(200).json({ posts: post_list, allPostNum: allPostCount })
    } catch (e) {
        console.error(e)
        //return { message: "500 伺服器內部錯誤 Server-side error occurred" }
        res.status(500).json({ message: e })
    }

}