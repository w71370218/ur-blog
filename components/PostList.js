import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import styles from '../styles/PostList.module.css'
import Loading from './Loading'
import Post from "./post"

const PostList = ({ posts, message }) => {
    /*
    const { data: session } = useSession();
    const [data, setData] = useState(null)
    const [new_query, setQuery] = useState(query)
    const [isLoading, setLoading] = useState(true)
    let user = null

    useEffect(() => {
        if (query) {
            setQuery(query)
        }
        if (!data) {
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
    */
    if (!message) {
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
    else {
        return (
            <>
                <h1>{message}</h1>
            </>
        )
    }
}

export default PostList;