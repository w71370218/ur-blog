import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import styles from '../styles/PostList.module.css'
import Loading from '../components/Loading'

import Post from "./post"

const PostList = () => {
    const { data: session } = useSession();
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    let user = null

    async function fetchProduct() {
        setLoading(true)
        const res = await fetch('/api/postlist', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ user: user }),
        })
        if (res.ok) {
            const posts = await res.json()
            setData(posts)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!data) {
            if (session) {
                user = session.user
            }
            fetchProduct();
        }
    }, [session]);

    if (isLoading) {
        return (
            <Loading className="h-100 w-100 d-flex justify-content-center align-self-center" />
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