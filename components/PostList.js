import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import styles from '../styles/PostList.module.css'
import Loading from './Loading'
import Post from "./post"

const PostList = ({ query, c_allPostNum }) => {
    const { data: session } = useSession();
    const [posts, setData] = useState(null)
    const [new_query, setQuery] = useState(query)
    const [isLoading, setLoading] = useState(true)
    const [postNum, setPostNum] = useState(0)
    const [allPostNum, setallPostNum] = useState(c_allPostNum)
    let user = null

    async function fetchProduct() {
        let req = { user: user }
        if (posts === null) {
            if (query) {
                setQuery(query)
                req.query = new_query
            }
            req.postNum = 0
        }
        else {
            req.postNum = posts.length
        }
        req.allPostNum = allPostNum

        const res = await fetch('/api/postlist', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(req),
        })
        if (res.ok) {
            const response = await res.json()
            const new_posts = response.posts
            if (posts === null) {
                setData(new_posts)
            }
            else {
                setData(posts => [...posts, ...new_posts])
            }
            setPostNum(postNum + new_posts.length)
            setallPostNum(response.allPostNum)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!posts) {
            setLoading(true)
            if (query) {
                setQuery(query)
            }
            if (session) {
                user = session.user
            }
            fetchProduct();
        }
        else {
            if (posts.length < allPostNum) {
                fetchProduct();
            }
        }
    }, [session, postNum]);
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