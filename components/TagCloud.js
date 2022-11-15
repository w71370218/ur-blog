import { useState, useEffect } from 'react'

import Link from 'next/link'
import Loading from './Loading'

const TagCloud = () => {
    const [tags, setTags] = useState(null)
    const [message, setMessage] = useState(null)
    const [isLoading, setLoading] = useState(true)

    const fetchTagCloud = async () => {
        setLoading(true)
        const res = await fetch('/api/TagCloud', {
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
        }
        else {
            const response = await res.json()
            setMessage(response.message)
        }
    }
    useEffect(() => {
        fetchTagCloud();

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