import Head from 'next/head';
import PostList from '../../components/PostList';
import SidebarLayout from '../../components/layout/SidebarLayout';
import Title from '../../components/Title';
import connect from '../../lib/connect';
import Posts from '../../models/posts'

export default function Home(props) {
    return (
        <>
            <Title title={"文章"} />
            <Head>
                <meta name="description" content="UR的施鹽小天地" />
                <meta name="Author" content="UR" />
                <meta property="og:description" content="UR的施鹽小天地" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <SidebarLayout>
                    <div className="px-md-5">
                        <PostList c_allPostNum={props.allPostNum} query={props.query} />
                    </div>
                </SidebarLayout>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    connect();
    let allPostNum = await Posts.countDocuments({});
    return { props: { allPostNum: allPostNum, query: {} } }
}  
