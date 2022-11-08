import Head from 'next/head'
import SidebarLayout from '../../components/layout/SidebarLayout'
import PostList from '../../components/PostList'
import Title from '../../components/Title'
import styles from '../../styles/PostList.module.css'
import { useSession } from "next-auth/react"
import { getSession } from "next-auth/react";
import connect from '../../lib/connect'
import Series from '../../models/series'
import Posts from '../../models/posts'
import Link from 'next/link'
import Router from 'next/router';

const SeriesDetails = (props) => {
    const { data: session } = useSession();
    const deleteSeries = async (e) => {
        if (confirm("是否要刪除這個系列?")) {
            e.preventDefault();
            const user = session.user.id
            const id = props.series.id
            const res = await fetch('/api/series/delete', {
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
            <Title title={`${props.series.name}`} />
            <Head>
                <meta name="description" content={props.series.description.length < 30 ? (`${props.series.description}`) : (`${props.series.description.substring(0, 30)}...`)} />
                <meta name="Author" content={`UR`} />
                <meta property="og:description" content={`${props.series.description.substring(0, 30)}...`} />
                <meta name="referrer" content="no-referrer" />
            </Head>
            <main>
                <SidebarLayout id={props.series.name}>
                    <div className={`${styles['post-list']} px-md-5 w-100`}>
                        {
                            props.series.cover ?
                                (<div className='w-100 mb-3' style={{ height: '30vh', background: '#000' }}></div>)
                                : (<></>)
                        }
                        <h1>{props.series.name}</h1>
                        <p className="text-secondary">
                            <span>{new Date(props.series.createdTime).toLocaleString()}</span>
                        </p>
                        <div className={styles['content']}>
                            {props.series.description}
                        </div>
                        {session ?
                            (<div>
                                <Link href={`/series/${props.series.id}/edit`}><a>編輯</a></Link>
                                <a href="" onClick={e => { deleteSeries(e) }}>刪除</a>
                            </div>)
                            : (<></>)
                        }
                        <hr />
                        <Link href={{ pathname: "../post/new", query: { series_name: props.series.name } }}><a>
                            <div className={`rounded-3 border pointer w-100 mb-3`}>
                                <div className={`copy text-center`}>
                                    <h3>新增</h3>
                                </div>
                            </div >
                        </a></Link>
                        <PostList query={props.query} c_allPostNum={props.allPostNum} />
                    </div>
                </SidebarLayout>
            </main >
        </>
    );
}

export async function getServerSideProps(context) {
    const { req } = context;
    const session = await getSession({ req })
    let user = null;
    if (session) {
        user = session.user
    }
    const query = { "series.id": context.query.id }

    connect();
    const series = await Series.findOne({ id: context.query.id }).lean();
    if (series !== null) {
        series._id = series._id.toString()
        const allPostNum = await Posts.countDocuments({ '$or': [{ "series.id": series }] });
        return { props: { query: query, series: series, allPostNum: allPostNum } }
    }
    return { props: { message: "此系列不存在或已經刪除了" } }

    /*
    const res = await handler(user, query)
    

    if (res.message) {
        return { props: { message: res.message, series: series } }
    }
    else {
        return { props: { posts: res.posts, series: res.posts[0].series } }
    }
    */
}

export default SeriesDetails;