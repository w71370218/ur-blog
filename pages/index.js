import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Welcome from '../components/Welcome';
import PostList from '../components/PostList';
import SidebarLayout from '../components/layout/SidebarLayout';
import Title from '../components/Title';
import connect from '../lib/connect';
import Posts from '../models/posts'
import Users from '../models/users'
import Tags from '../models/tags'
import Series from '../models/series';
import { getSession } from 'next-auth/react';

export default function Home(props) {
  return (
    <>
      <Title title={"首頁"} />
      <Head>
        <meta name="description" content="UR的施鹽小天地" />
        <meta name="Author" content="UR" />
        <meta property="og:description" content="UR的施鹽小天地" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SidebarLayout>
        <>
          <h1 className={styles.title}>
            <Welcome />
          </h1>
          <div className="px-md-5">
            <PostList c_allPostNum={props.allPostNum} firstPost={props.firstPost} />
          </div>
        </>
      </SidebarLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  connect();
  let allPostNum = await Posts.countDocuments({});
  const posts = [];
  let skip_postNum = 0
  const session = await getSession();
  let user = null;
  if (session) {
    user = session.user;
  }
  while (posts.length < 1) {
    let postsQ = await Posts.find({})
      .skip(skip_postNum)
      .sort({ 'id': -1 })
      .lean();
    for (let i = 0; i < postsQ.length; i++) {
      //author
      const author = await Users.findOne({ _id: postsQ[i].author }).select('id username').lean();
      author._id = author._id.toString();
      postsQ[i].author = author;
      //access
      if (user) {
        if ((user.id === author.id && postsQ[i].access === "self") || postsQ[i].access === "any") {
          posts.push(postsQ[i])
        } else {
          continue;
        }
      }
      else {
        if (postsQ[i].access === "any") {
          posts.push(postsQ[i])
        } else {
          continue;
        }
      }


      //post
      postsQ[i]._id = postsQ[i]._id.toString();
      postsQ[i].content = postsQ[i].content.replace(/!\[](.+)/g, ' ')
        .replace(/<video.+<\/video>/g, ' ')
        .substring(0, 300);
    }
    skip_postNum++;

  }

  allPostNum--;

  return { props: { allPostNum: allPostNum, firstPost: posts } }


  /*
const { req } = context;
const session = await getSession({ req })
let user = null;
if (session) {
user = session.user
}

const res = await handler(user)
if (res.message) {
return { props: { message: res.message } }
}

return { props: { posts: res.posts } }
*/
}  
