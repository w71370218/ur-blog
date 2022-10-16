import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Welcome from '../components/Welcome';
import PostList from '../components/PostList';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <>
      <Head>
        <title>首頁 &#124; UR&#39;s Blog</title>
        <meta name="description" content="UR的施鹽小天地" />
        <meta name="Author" content="UR" />
        <meta property="og:title" content={`首頁 ${'&#124;'} UR${'&#39;'}s Blog`} />
        <meta property="og:description" content="UR的施鹽小天地" />
        <meta name="referrer" content="no-referrer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.title}>
            <Welcome />
          </h1>
          <div className='container d-md-flex align-items-stretch'>
            <PostList />
            <Sidebar />
          </div>

        </div>
      </main>

    </>
  )
}
