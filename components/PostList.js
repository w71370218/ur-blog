import { useState, useEffect } from "react"
import styles from '../styles/PostList.module.css'
import Loading from '../components/Loading'

import Post from "./post"

const PostList = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
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

    if (isLoading) {
        return (
            <Loading />
        )
    }
    return (
        <div className={`${styles['post-list']} p-1 p-md-5 pt-5`} >
            {data.map(post => (
                <div key={post.id} >
                    <Post post={post} />
                </div>
            ))
            }
        </div >
    )
}

export default PostList;