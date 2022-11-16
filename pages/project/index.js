import Head from 'next/head';
import ProjectList from '../../components/project/ProjectList';
import SidebarLayout from '../../components/layout/SidebarLayout';
import Title from '../../components/Title';

export default function Home() {
    return (
        <>
            <Title title={"作品集"} />
            <Head>
                <meta name="description" content="UR的施鹽小天地" />
                <meta name="Author" content="UR" />
                <meta property="og:description" content="UR的施鹽小天地" />
            </Head>
            <ProjectList className="p-1 p-md-5 pt-5"></ProjectList>
        </>
    )
}
export async function getServerSideProps(context) {
    return { props: { SidebarLayout: true } }
}