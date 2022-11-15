//import connect from '../../lib/connect';
//import Posts from '../../models/posts';
//import Tags from '../../models/tags';
import clientPromise from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
    try {
        setTimeout(() => {
            res.status(200).json({ tags: tags, unfinised: true })
        }, 5000)
        const dbclient = await clientPromise;
        const db = dbclient.db("ur-blog");
        const posts = db.collection("posts")

        const q_tags = req.body.tags

        for (let tag of q_tags) {
            //const cb_tags = await posts.find({ '$or': [{ "tags": ObjectId(tag._id) }] }).toArray();
            //console.log(cb_tags)
            const query = { '$or': [{ "tags": ObjectId(tag._id) }] }

            const allPostNum = await posts.countDocuments(query);
            tag.allPostNum = allPostNum.toString();
        }

        let tags;
        tags = q_tags
        tags.sort((a, b) => (a.allPostNum < b.allPostNum) ? 1 : ((b.allPostNum < a.allPostNum) ? -1 : 0))
        tags = q_tags.slice(0, 3)

        const q1 = tags[~~(tags.length / 3 * 1) - 1].allPostNum
        const q2 = tags[~~(tags.length / 3 * 2) - 1].allPostNum
        const q3 = tags[~~(tags.length / 3 * 3) - 1].allPostNum
        tags.forEach(tag => {
            if (tag.allPostNum >= q1) {
                tag.size = "4"
            }
            else if (tag.allPostNum >= q2) {
                tag.size = "5"
            }
            else {
                tag.size = "6"
            }
        })
        res.status(200).json({ tags: tags, unfinised: false })
    }
    catch (e) {
        console.error(e)
        res.status(500).json({ message: e })
    }
}