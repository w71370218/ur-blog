import { useState, useEffect } from 'react'

import Link from 'next/link'
import Loading from './Loading'

const TagCloud = () => {
    const [tags, setTags] = useState(null)
    const [message, setMessage] = useState(null)
    const [isLoading, setLoading] = useState(true)

    const fetchTagCloud = async (tags) => {
        setLoading(true)
        const res = await fetch('/api/TagCloud', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ tags: tags }),
        })
        if (res.ok) {
            const response = await res.json()
            const new_tags = response.tags
            const unfinised = response.unfinised
            setTags(new_tags)
            if (unfinised) {
                fetchTagCloud(new_tags)
            }
            setLoading(false)
        }
        else {
            const response = await res.json()
            setMessage(response.message)
            setLoading(false)
        }
    }

    const getAllTags = async () => {
        setLoading(true)
        const res = await fetch('/api/getAllTags', {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
            }
        })
        if (res.ok) {
            const response = await res.json()
            const new_tags = response.tags
            setTags(new_tags)
            setLoading(false)
            fetchTagCloud(new_tags)
        }
        else {
            const response = await res.json()
            setMessage(response.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllTags();

    }, [])

    if (isLoading) {
        return (<><Loading /></>)
    }
    if (message) {
        return (<><h1>{message}</h1></>)
    }
    return (<>

        {tags && tags.map(tag => (
            <Link href={`/tag/${tag.id}`} key={tag.id}>
                <a className={`me-3 fs-${tag.size} text-nowrap`}>
                    <span className={`tag`} style={{ color: `rgb(40, ${Math.floor(Math.random() * (120 - 80 + 1)) + 80}, ${Math.floor(Math.random() * (225 - 150 + 1)) + 150})` }}>
                        {tag.name}
                    </span>
                </a>
            </Link>
        ))}
    </>)
}

export default TagCloud