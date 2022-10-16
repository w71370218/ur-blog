import Link from 'next/link'
import Title from '../components/Title';

export default function Custom500() {
    return <>
        <Title title={"500 Server Internal Error 伺服器內部錯誤"} />
        <h1>500 - Server-side error occurred</h1>
    </>
}