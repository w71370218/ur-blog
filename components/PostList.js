import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import styles from '../styles/PostList.module.css'
import Loading from './Loading'
import Post from "./post"

const PostList = ({ query }) => {
    const { data: session } = useSession();
    const [posts, setData] = useState(null)
    const [new_query, setQuery] = useState(query)
    const [isLoading, setLoading] = useState(true)
    let user = null

    async function fetchProduct() {
        setLoading(true)
        let req = { user: user }
        if (query) {
            setQuery(query)
            req.query = new_query
        }

        const res = await fetch('/api/postlist', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(req),
        })
        if (res.ok) {
            const posts = await res.json()
            setData(posts)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!posts) {
            if (query) {
                setQuery(query)
            }
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
        <div className={`${styles['post-list']} `} >
            {posts.map(post => (
                <div key={post.id} >
                    <Post post={post} />
                </div>
            ))
            }
        </div >
    )
}

export default PostList;