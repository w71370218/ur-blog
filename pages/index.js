import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Welcome from '../components/Welcome';
import PostList from '../components/PostList';
import SidebarLayout from '../components/layout/SidebarLayout';
import Title from '../components/Title';

export default function Home() {
  return (
    <>
      <Title title={"首頁"} />
      <Head>
        <meta name="description" content="UR的施鹽小天地" />
        <meta name="Author" content="UR" />
        <meta property="og:description" content="UR的施鹽小天地" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Welcome />
        </h1>
        <SidebarLayout>
          <div className="px-md-5">
            <PostList />
          </div>
        </SidebarLayout>
      </main>
    </>
  )
}
