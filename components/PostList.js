import { useState, useEffect } from "react"
import Link from 'next/link'
import Post from "./post"

const PostList = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    async function fetchProduct() {
        setLoading(true)
        const res = await fetch('/api/postlist')
        if (res.ok) {
            const posts = await res.json()
            setData(posts)
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProduct();
    }, []);
    if (!isLoading && data) {
        return (
            <div>
                {data.map(post => (
                    <Link key={post.id} href={`post/${post.id}`} >
                        <a>
                            <Post post={post} />
                        </a>
                    </Link>
                ))
                }
            </div >
        )
    }

}
/*
export async function getStaticProps() {
    console.log(123)
    const res = await fetch('/api/post/postlist')
    const posts = await res.json();
    console.log(posts)
    return { props: { posts: posts } }
}
*/

export default PostList;