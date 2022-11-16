import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import SeriesList from '../../components/series/SeriesList';
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
            <SeriesList className="p-1 p-md-5 pt-5"></SeriesList>
        </>
    )
}
export async function getServerSideProps(context) {
    return { props: { SidebarLayout: true } }
}