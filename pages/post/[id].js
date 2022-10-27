import Head from 'next/head'
import connect from "../../lib/connect"
import Posts from "../../models/posts"
import Tags from "../../models/tags";
import Users from "../../models/users";
import Series from '../../models/series'
import SidebarLayout from '../../components/layout/SidebarLayout'
import Markdown from '../../components/Markdown';
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
    if (session) {
        if (props.post.author.id != session.user.id && props.post.access === "self") {
            return (<>
                <main>
                    <h1>此篇文章不存在或已經刪除了</h1>
                </main>
            </>)
        }
    }
    else {
        if (props.post.access === "self") {
            return (<>
                <main>
                    <h1>此篇文章不存在或已經刪除了</h1>
                </main>
            </>)
        }
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
                <SidebarLayout>
                    <div className={`${styles['post-list']} ${styles['post-area']} w-100`}>
                        <div className={``}>
                            <div className='p-1 p-md-5 pt-5'>
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
                                            <Link href={`/ post / edit / ${props.post.id}`}><a>編輯</a></Link>
                                            <a href="" onClick={e => { deletePost(e) }}>刪除</a>
                                        </div>)
                                        : (<></>)) : (<></>)
                                }
                                <hr />
                                <div className={styles['content']}>
                                    <Markdown>{props.post.content}</Markdown>
                                </div>
                            </div>
                        </div>
                        {props.post.series.id &&
                            <div className='series bg-light'>
                                <Link href={`/series/${props.post.series.id}`}>
                                    <div className='series-name pointer border p-4 pb-5'>
                                        <div className='text-secondary'><h3>系列</h3></div>
                                        <div className='mt-3 '><h4>{props.post.series.name}</h4></div>
                                        <div>總共 {props.post.series.postCount} 篇文章</div>
                                    </div>
                                </Link>
                                <div className='series-page d-flex '>
                                    {props.post.series.prev &&
                                        <Link href={`/post/${props.post.series.prev.id}`}>
                                            <div className='w-100 pointer border p-4 pt-2 '>
                                                <div className='text-secondary'>上一篇</div>
                                                <a>{props.post.series.prev.title}</a>
                                            </div>
                                        </Link>
                                    }
                                    {props.post.series.next &&
                                        <Link href={`/post/${props.post.series.next.id}`}>
                                            <div className='w-100 pointer border p-4 pt-2 '>
                                                <div className='text-secondary text-end'>下一篇</div>
                                                <a>{props.post.series.next.title}</a>
                                            </div>
                                        </Link>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </SidebarLayout >
            </main >
        </>
    );
}

export async function getServerSideProps(context) {
    connect();
    const post = await Posts.findOne({ id: context.query.id }).lean();
    if (post !== null) {
        post._id = post._id.toString()
        //author
        const author = await Users.findOne({ _id: post.author }).select("id username").lean();
        author._id = author._id.toString()
        post.author = author;
        //tags
        for (let i = 0; i < post.tags.length; i++) {
            const tag = await Tags.findOne({ _id: post.tags[i] }).select("id name").lean();
            tag._id = tag._id.toString()
            post.tags[i] = tag;
        }
        //series
        if (post.hasOwnProperty("series") && post.series) {
            if (post.series.hasOwnProperty("id")) {
                const series = await Series.findOne({ _id: post.series.id }).lean();

                series._id = series._id.toString();

                //series other posts
                const seriesPosts = await Posts.find({ "series.id": series }).select("id title").lean();
                series.postCount = seriesPosts.length;
                const post_index = seriesPosts.map(obj => obj.id).indexOf(post.id)
                if (seriesPosts[post_index - 1]) {
                    series.prev = seriesPosts[post_index - 1]
                    series.prev._id = series.prev._id.toString()
                }
                if (seriesPosts[post_index + 1]) {
                    series.next = seriesPosts[post_index + 1]
                    series.next._id = series.next._id.toString()
                }

                Object.assign(post.series, series);
            }
        }
        return { props: { post: post } }
    }
    return { props: { message: "此篇文章不存在或已經刪除了" } }
}

export default PostDetails;