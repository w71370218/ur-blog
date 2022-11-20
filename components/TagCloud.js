import { useState, useEffect } from 'react'

import Link from 'next/link'
import Loading from './Loading'

const TagCloud = () => {
    const [tags, setTags] = useState(null)
    const [message, setMessage] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const colors = [];

    const sortTags = (tags) => {

        tags.sort((a, b) => (a.allPostNum < b.allPostNum) ? 1 : ((b.allPostNum < a.allPostNum) ? -1 : 0))
        tags = tags.slice(0, 30)

        const q1 = tags[~~(tags.length / 3 * 1) - 1].allPostNum
        const q2 = tags[~~(tags.length / 3 * 2) - 1].allPostNum
        const q3 = tags[~~(tags.length / 3 * 3) - 1].allPostNum
        tags.forEach(tag => {
            if (tag.allPostNum >= q1) {
                tag.size = "4"
            }
            else if (tag.allPostNum >= q2) {
                tag.size = "5"
            }
            else {
                tag.size = "6"
            }
            let color = `rgb(40, ${Math.floor(Math.random() * (120 - 80 + 1)) + 80}, ${Math.floor(Math.random() * (225 - 150 + 1)) + 150})`
            colors.push(color)
        })
        let tagslist = tags
        setTags(tagslist)


    }

    const fetchTagCloud = async (tag) => {
        setLoading(true)
        const res = await fetch('/api/TagCloud', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ tag: tag }),
        })
        if (res.ok) {
            const response = await res.json()
            const tag = response.tag
            return tag
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

            let promise_tags_list = []
            let tags_list = []
            const getTagCcount = async (tag) => {
                tag = await fetchTagCloud(tag)
                tags_list.push(tag)
            }

            for (let tag of new_tags) {
                promise_tags_list.push(getTagCcount(tag))
            }

            Promise.allSettled(promise_tags_list)
                .then(
                    value => {
                        sortTags(tags_list)
                        setLoading(false)
                    }
                )
                .catch(err => console.log(err))

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
        return (<div className='m-5'><Loading /></div>)
    }
    if (message) {
        return (<><h1>{message}</h1></>)
    }

    return (<>

        {tags && tags.map((tag, index) => (
            <Link href={`/tag/${tag.id}`} key={tag.id}>
                <a className={`  btn btn-outline-secondary me-3 mb-1 fs-${tag.size} text-nowrap`}>
                    <span className={`tag`} style={{ color: colors[index] }}>
                        {tag.name} {colors[index]}
                    </span>
                </a>
            </Link>
        ))}
    </>)
}

export default TagCloud