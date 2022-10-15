import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Welcome from '../components/Welcome';
import PostList from '../components/PostList';

export default function Home() {
  return (
    <>
      <Head>
        <title>首頁 &#124; UR&#39;s Blog</title>
        <meta name="description" content="UR的施鹽小天地" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.title}>
            <Welcome />
          </h1>
          <PostList />
        </div>
      </main>

    </>
  )
}
