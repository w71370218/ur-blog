import { getSession, getCsrfToken } from "next-auth/react";
import Router from 'next/router';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import PostEdit from "../../components/PostEdit"
import onFileUpload from "../../lib/imgur"

export default function NewPost({ csrfToken }) {
    const router = useRouter()
    const { data: session } = useSession({ required: true });
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState(null);
    const [tags, setTags] = useState([]);
    const [series, setSeries] = useState('');
    const [alt, setAlt] = useState('')
    const [coverImage, setCoverImage] = useState(null)

    useEffect(() => {
        if (router.query.series_name) {
            setSeries(router.query.series_name)
        }
    }, [])

    const dontSubmit = (event) => {
        if (event.key === "Enter" && event.target.id !== "content") {
            event.preventDefault();
            console.log(event.target)
        }
    }

    const publishPost = async (e) => {
        e.preventDefault();
        const author = session.user.id
        setMessage(null)

        let imgur_url;
        let deletehash;
        if (coverImage && coverImage !== null && coverImage !== '') {
            const response = await onFileUpload(coverImage)
            imgur_url = response.data.link
            deletehash = response.data.deletehash
        }

        const res = await fetch('/api/post/new', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ title, content, tags, series, author, alt, coverImage, imgur_url, deletehash }),
        })
        let data = await res.json()
        if (data.message) {
            setMessage(data.message)
        }
        if (data.message == "succeed") {
            return Router.push({
                pathname: '/post/[id]',
                query: { id: data.id },
            })
        }
    }
    const functions = {
        dontSubmit: dontSubmit,
        publishPost: publishPost
    }

    if (session) {
        return (
            <>
                <PostEdit titlename="??????" title={title} content={content} message={message} csrfToken={csrfToken}
                    series={series} tags={tags} alt={alt} coverImage={coverImage}
                    set={{ setTitle: setTitle, setContent: setContent, setTags: setTags, setSeries: setSeries, setAlt: setAlt, setCoverImage: setCoverImage }}
                    functions={functions} />
            </>
        )
    }
    else {
        return (
            <h1>?????????????????????????????????</h1>
        )
    }
}

export async function getServerSideProps(context) {
    const { req } = context;

    const session = await getSession({ req })
    if (!session) {
        return {
            redirect: { destination: "/" }
        }
    }
    const csrfToken = await getCsrfToken(context);

    return {
        props: { csrfToken: csrfToken },

    }
}