import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";
import gfm from 'remark-gfm';
import connect from "../../lib/connect"
import Posts from "../../models/posts"
import Tags from "../../models/tags";
import Users from "../../models/users";
import Sidebar from '../../components/Sidebar';
import TagGroup from '../../components/TagGroup';
import Title from '../../components/Title'
import styles from '../../styles/PostList.module.css'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import Router from 'next/router';

const PostDetails = (props) => {
    const { data: session } = useSession();
    const deletePost = async (e) => {
        if (confirm("是否要刪除這篇文章?")) {
            e.preventDefault();
            const user = session.user.id
            const id = props.post.id
            const res = await fetch('/api/post/delete', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ id, user }),
            })
            let data = await res.json()
            if (data.message == "succeed") {
                alert("刪除成功!")
                return Router.push("/")
            }
            else {
                if (data.message) {
                    alert(data.message)

                }
            }
        }
    }

    if (props.message) {
        return (
            <main>
                <h1>{props.message}</h1>
            </main>
        )
    }
    return (
        <>
            <Title title={props.post.title} />
            <Head>
                <meta name="description" content={`${props.post.content.substring(0, 30)}...`} />
                <meta name="Author" content={`${props.post.author.username}`} />
                <meta name="keyword" content={props.post.tags.map(tag => (`${tag.name} `))} />
                <meta property="og:description" content={`${props.post.content.substring(0, 30)}...`} />
                <meta name="referrer" content="no-referrer" />
            </Head>
            <main>
                <div className='container  d-md-flex align-items-stretch'>
                    <div className='row w-100'>
                        <div className='col-md-12'>
                            <div className={`${styles['post-list']} p-1 p-md-5 pt-5 w-100`}>
                                <h1>{props.post.title}</h1>
                                <br />
                                <TagGroup tags={props.post.tags} />
                                <br />
                                <div>
                                    <p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        </svg>
                                        <span> {props.post.author.username}</span>
                                    </p>
                                </div>
                                <div className="date">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                        </svg>
                                        <span> 發佈時間:  {new Date(props.post.publishedTime).toLocaleString()}</span>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                        </svg>
                                        <span> 最後編輯時間:  {new Date(props.post.updatedTime).toLocaleString()}</span>
                                    </div>
                                </div>
                                {session ?
                                    ((session.user.id === props.post.author.id) ?
                                        (<div>
                                            <Link href={`/post/edit/${props.post.id}`}><a>編輯</a></Link>
                                            <a href="" onClick={e => { deletePost(e) }}>刪除</a>
                                        </div>)
                                        : (<></>)) : (<></>)
                                }
                                <hr />
                                <div className={styles['content']}><ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[gfm]}>{props.post.content}</ReactMarkdown></div>
                            </div>
                        </div>
                    </div>
                    <Sidebar />
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