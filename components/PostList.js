import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import styles from '../styles/PostList.module.css'
import Loading from '../components/Loading'

import Post from "./post"

const PostList = () => {
    const { data: session } = useSession();

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
                //暫時的方式 之後會改成在server api 篩選
                session ?
                    (
                        (post.access === "any" || post.author.id === session.user.id) && (
                            <div key={post.id} >
                                <Post post={post} />
                            </div>
                        )
                    )
                    : (
                        (post.access === "any") && (
                            <div key={post.id} >
                                <Post post={post} />
                            </div>
                        )
                    )

            ))
            }
        </div >
    )
}

export default PostList;