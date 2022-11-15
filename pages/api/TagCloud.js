import connect from '../../lib/connect';
import Posts from '../../models/posts';
import Tags from '../../models/tags';

connect();

export default async function handler(req, res) {
    try {
        const q_tags = await Tags.find({}).lean();
        let tags = []
        for (let i = 0; i < q_tags.length; i++) {
            const query = { '$or': [{ "tags": q_tags[i] }] }
            const allPostNum = await Posts.countDocuments(query);
            tags[i] = {}
            tags[i].name = q_tags[i].name
            tags[i].id = q_tags[i].id
            tags[i].allPostNum = allPostNum;
        }
        tags.sort((a, b) => (a.allPostNum < b.allPostNum) ? 1 : ((b.allPostNum < a.allPostNum) ? -1 : 0))
        tags = tags.slice(0, 3)
        /*
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
        */
        res.status(200).json({ tags: tags })
    }
    catch (e) {
        console.error(e)
        res.status(500).json({ message: e })
    }
}