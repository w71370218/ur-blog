import connect from '../../lib/connect';
import Posts from '../../models/posts';

connect();

export default async function handler(req, res) {
    try {
        const q_tags = req.body.tags
        let tags = []
        console.log(q_tags)

        for (let tag of q_tags) {
            const query = { '$or': [{ "tags": tag }] }
            const allPostNum = await Posts.countDocuments(query);
            let n_tag = {}
            n_tag.name = tag.name
            n_tag.id = tag.id
            n_tag.allPostNum = allPostNum;
            tags.push(n_tag)
        }

        tags.sort((a, b) => (a.allPostNum < b.allPostNum) ? 1 : ((b.allPostNum < a.allPostNum) ? -1 : 0))
        tags = tags.slice(0, 3)

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
        res.status(200).json({ tags: tags })
    }
    catch (e) {
        console.error(e)
        res.status(500).json({ message: e })
    }
}