import connect from "../../lib/connect"
import Posts from "../../models/posts"
import Tags from "../../models/tags";
import Users from "../../models/users";
import Head from 'next/head'

const PostDetails = (props) => {
    if (props.message) {
        return (
            <main>
                <h1>{props.message}</h1>
            </main>
        )
    }
    return (
        <>
            <Head>
                <title> {props.post.title} &#124; UR&#39;s Blog</title>
                <meta name="description" content="UR的施鹽小天地" />
            </Head>
            <main>
                <div className='container '>
                    <h1>{props.post.title}</h1>
                    <div>{props.post.author.username}</div>
                    <div>{props.post.content}</div>
                </div>
            </main>
        </>
    );
}

export async function getServerSideProps(context) {
    connect();
    const post = await Posts.findOne({ id: context.query.id }).lean();
    if (post !== null) {
        post._id = post._id.toString()
        const author = await Users.findOne({ _id: post.author }).select("id username").lean();
        author._id = author._id.toString()
        post.author = author;
        for (let i = 0; i < post.tags.length; i++) {
            const tag = await Tags.findOne({ _id: post.tags[i] }).select("id name").lean();
            tag._id = tag._id.toString()
            post.tags[i] = tag;
        }
        return { props: { post: post } }
    }
    return { props: { message: "此篇文章不存在或已經刪除了" } }
}

export default PostDetails;