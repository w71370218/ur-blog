import Head from 'next/head'
import SidebarLayout from '../../../components/layout/SidebarLayout'
import PostList from '../../../components/PostList'
import Title from '../../../components/Title'
import styles from '../../../styles/PostList.module.css'
import { useSession } from "next-auth/react"
import { getSession } from "next-auth/react";
import connect from '../../../lib/connect'
import Tag from '../../../models/tags'
import Posts from '../../../models/posts'
import Link from 'next/link'

const TagDetails = (props) => {
    const { data: session } = useSession();
    if (props.message) {
        return (
            <main>
                <h1>{props.message}</h1>
            </main>
        )
    }

    return (
        <>
            <Title title={`標籤：${props.tags.name}`} />
            <Head>
                <meta name="Author" content={`UR`} />
                <meta name="referrer" content="no-referrer" />
            </Head>
            <main>
                <div className={`${styles['post-list']} px-md-5 w-100`}>
                    {
                        props.tags.cover ?
                            (<div className='w-100 mb-3' style={{ height: '30vh', background: '#000' }}></div>)
                            : (<></>)
                    }
                    <h1>{`標籤：${props.tags.name}`}</h1>
                    <p className="text-secondary">
                        <span>{new Date(props.tags.createdTime).toLocaleString()}</span>
                    </p>
                    {session ?
                        (<div>
                            <Link href={`/tags/${props.tags.id}/edit`}><a>編輯</a></Link>
                            <a href="" onClick={e => { deleteTag(e) }}>刪除</a>
                        </div>)
                        : (<></>)
                    }
                    <hr />
                    <PostList query={props.query} c_allPostNum={props.allPostNum} />
                </div>
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

    connect();
    const tags = await Tag.findOne({ id: context.query.id }).lean();
    if (tags !== null) {
        const query = { '$or': [{ "tags": tags }] }
        tags._id = tags._id.toString()
        const allPostNum = await Posts.countDocuments({ '$or': [{ "tags": tags }] });
        return { props: { query: query, tags: tags, allPostNum: allPostNum, SidebarLayout: true, id: tags.name } }
    }
    return { props: { message: "此系列不存在或已經刪除了", SidebarLayout: true } }
}

export default TagDetails