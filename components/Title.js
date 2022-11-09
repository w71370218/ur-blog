import Head from 'next/head';

const Title = ({ title }) => {
    return (
        <Head>
            <title>{`${title} | UR's Blog`}</title>
            <meta property="og:title" content={`${title} | UR's Blog`} />
            <meta property="og:site_name" content={`UR's Blog`} />
        </Head>
    )
}

export default Title