import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Welcome from '../../components/Welcome';
import PostList from '../../components/PostList';
import SidebarLayout from '../../components/layout/SidebarLayout';
import Title from '../../components/Title';

export default function Home() {
    return (
        <>
            <Title title={"系列"} />
            <Head>
                <meta name="description" content="UR的施鹽小天地" />
                <meta name="Author" content="UR" />
                <meta property="og:description" content="UR的施鹽小天地" />
            </Head>

            <main className={styles.main}>
                <SidebarLayout>
                    <h1>敬請期待</h1>
                </SidebarLayout>
            </main>
        </>
    )
}
