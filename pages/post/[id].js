import Head from 'next/head'
import connect from "../../lib/connect"
import Posts from "../../models/posts"
import Tags from "../../models/tags";
import Users from "../../models/users";
import Series from '../../models/series'
import FontResize from '../../components/FontResize';
import Markdown from '../../components/Markdown';
import TagGroup from '../../components/TagGroup';
import Title from '../../components/Title'
import TOC from '../../components/TableOfContents';
import getSVG from '../../components/getSVG';
import styles from '../../styles/PostList.module.css'
import { useSession, getSession } from "next-auth/react"
import Link from 'next/link'
import Router from 'next/router';
import { useRef, useEffect, useState } from 'react';

const PostDetails = (props) => {
    const ref = useRef();
    const markdown_ref = useRef();
    const left_ref = useRef();
    const [markdown_content, setMarkdownContent] = useState(null);
    const [height, setHeight] = useState(0);
    const [left, setLeft] = useState(0);
    useEffect(() => {
        setHeight(ref.current.getRootNode().getElementsByTagName("nav")[0].offsetHeight)
        setMarkdownContent(markdown_ref.current)
        setLeft(left_ref.current.offsetLeft)
    }, [ref.current, markdown_ref.current, left_ref.current])

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
                <meta name="keyword" content={props.post.tags.map(tag => (`${tag.name}`))} />
                <meta property="og:description" content={`${props.post.content.substring(0, 30)}...`} />
                {props.post.cover && <meta property='og:image' content={`${props.post.cover.url}`} />}
                <meta name="referrer" content="no-referrer" />
            </Head>
            <TOC top={height} left={left} content={markdown_content} />
            <main ref={ref}>
                <div ref={left_ref} className={`${styles['post-list']} ${styles['post-area']} w-100`}>
                    <div className={``}>
                        {props.post.cover &&
                            <div className={`w-100 d-flex justify-content-center align-items-center ${styles.cover}`}>
                                <img className="rounded-top" src={props.post.cover.url} alt={props.post.cover.alt} />
                            </div>
                        }
                        <div className={`pb-5 px-md-5 px-3 ${!props.post.cover ? ("pt-md-5 pt-3") : ("pt-3")}`}>
                            <h1 className="mb-3">{props.post.title}</h1>
                            {props.post.tags[0] && <><TagGroup tags={props.post.tags} all={true} /> </>}
                            <div className="mb-3">
                                <p>
                                    {getSVG('person')}
                                    <span> {props.post.author.username}</span>
                                </p>
                            </div>
                            <div className="date mb-3">
                                <div>
                                    {getSVG('clock')}
                                    <span> 發佈時間:  {new Date(props.post.publishedTime).toLocaleString()}</span>
                                </div>
                                <div>
                                    {getSVG('clock')}
                                    <span> 最後編輯時間:  {new Date(props.post.updatedTime).toLocaleString()}</span>
                                </div>
                            </div>
                            {session ?
                                ((session.user.id === props.post.author.id) ?
                                    (<div>
                                        <Link href={`/post/${props.post.id}/edit`}><a>編輯</a></Link>
                                        <a href="" onClick={e => { deletePost(e) }}>刪除</a>
                                    </div>)
                                    : (<></>)) : (<></>)
                            }
                            <div ref={markdown_ref} className={styles['content']}>
                                <FontResize>
                                    <hr />
                                    <Markdown top={height}>{props.post.content}</Markdown>
                                </FontResize>
                            </div>
                        </div>
                    </div>
                    {props.post.series && props.post.series.id ?
                        (<div className={`${styles.series}`}>
                            <Link href={`/series/${props.post.series.id}`}>
                                <div className='series-name pointer border p-4 pb-5'>
                                    <div className='text-secondary'><h3>系列</h3></div>
                                    <div className='mt-3 '><h4>{props.post.series.name}</h4></div>
                                    <div className='text-secondary'>總共 {props.post.series.postCount} 篇文章</div>
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
                                        <div className='w-100 pointer border p-4 pt-2 text-end '>
                                            <div className='text-secondary'>下一篇</div>
                                            <a>{props.post.series.next.title}</a>
                                        </div>
                                    </Link>
                                }
                            </div>
                        </div>
                        ) : (<></>)
                    }
                </div>
            </main >
        </>
    );
}

export async function getServerSideProps(context) {
    const { req } = context;
    const session = await getSession({ req })

    connect();
    const post = await Posts.findOne({ id: context.query.id }).lean();
    if (post !== null) {
        post._id = post._id.toString()
        //author
        const author = await Users.findOne({ _id: post.author }).select("id username").lean();
        author._id = author._id.toString()
        post.author = author;

        //access 
        if (session) {
            if (post.author.id != session.user.id && post.access === "self") {
                return { props: { message: "此篇文章不存在或已經刪除了" } }
            }
        }
        else {
            if (post.access === "self") {
                return { props: { message: "此篇文章不存在或已經刪除了" } }
            }
        }

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
        return { props: { post: post, SidebarLayout: true, id: post.title } }
    }
    return { props: { message: "此篇文章不存在或已經刪除了", SidebarLayout: true } }
}

export default PostDetails;