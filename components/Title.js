import Head from 'next/head';

const Title = ({ title }) => {
    return (
        <Head>
            <title>{title} &#124; UR&#39;s Blog</title>
            <meta property="og:title" content={`${title} ${'&#124;'} UR${'&#39;'}s Blog`} />
        </Head>
    )
}

export default Title