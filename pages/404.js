import Link from 'next/link'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Title from '../components/Title';

const NotFound = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 3000)
    }, [])
    return (
        <>
            <Title title={"404 Not Found 此頁面不存在"} />
            <h1>404 Not Found 此頁面不存在</h1>
            <p>3秒後將回到首頁</p>
            <p><Link href="/"><a>點此回到首頁</a></Link></p>
        </>
    );
}
export default NotFound;