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
        setLoading(true)
        let req = { user: user }
        if (posts === null) {
            if (query) {
                setQuery(query)
                req.query = new_query
            }
            req.postNum = 0
        }
        else {
            if (query) {
                setQuery(query)
                req.query = new_query
            }
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
            if (query) {
                setQuery(query)
            }
            if (session) {
                user = session.user
            }
            fetchProduct();
        }
        else {
            if (query) {
                setQuery(query)
            }
            if (session) {
                user = session.user
            }
            if (posts.length < allPostNum) {
                fetchProduct();
            }
        }
    }, [session, postNum]);


    return (
        <div className={`${styles['post-list']} `} >
            {
                posts ?
                    (
                        posts.map(post => (
                            <div key={post.id} >
                                <Post post={post} />
                            </div>
                        ))
                    ) : (<></>)
            }
            {
                isLoading ?
                    (<Loading />) : (<></>)
            }
        </div >
    )
}

export default PostList;