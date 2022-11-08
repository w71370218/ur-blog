import { getSession, getCsrfToken } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import Router from 'next/router';
import Posts from '../../../models/posts'
import Users from '../../../models/users'
import Tags from '../../../models/tags'
import Series from '../../../models/series'
import PostEdit from "../../../components/PostEdit"
import onFileUpload from "../../../lib/imgur"
import deleteImgurImage from "../../../lib/deleteImgurImage"

export default function EditPost({ csrfToken, post }) {
    const { data: session } = useSession({ required: true });
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [message, setMessage] = useState(null);
    const [tags, setTags] = useState(post.tags);
    const [series, setSeries] = useState(post.series);

    var post_cover_alt = ''
    var post_cover_url = null
    if (post.cover) {
        if (post.cover.hasOwnProperty('alt')) {
            post_cover_alt = post.cover.alt
        }
        if (post.cover.hasOwnProperty('url')) {
            post_cover_url = post.cover.url
        }
    }
    const [alt, setAlt] = useState(post_cover_alt)
    const [coverImage, setCoverImage] = useState(post_cover_url)
    const [changedImage, setChangedImage] = useState(false)

    const dontSubmit = (event) => {
        if (event.key === "Enter" && event.target.id !== "content") {
            event.preventDefault();
        }

    }

    const updatePost = async (e) => {
        e.preventDefault();
        const user = session.user.id
        const id = post.id
        setMessage(null)

        let imgur_url;
        let deletehash;
        if (changedImage && coverImage && coverImage !== null && coverImage !== '') {
            if (post.cover && post.cover !== null) {
                if (post.cover.hasOwnProperty("url") && post.cover.hasOwnProperty("deleteHash")) {
                    if (post.cover.url !== "" && post.cover.url !== null) {
                        await deleteImgurImage(post.cover.deleteHash)
                    }
                }
            }
            const response = await onFileUpload(coverImage)
            imgur_url = response.data.link
            deletehash = response.data.deletehash
        }
        else if (changedImage && (!coverImage || coverImage === null || coverImage === '')) {
            await deleteImgurImage(post.cover.deleteHash)
        }

        const res = await fetch('/api/post/update', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ id, title, content, tags, series, user, coverImage, alt, changedImage, imgur_url, deletehash }),
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
        updatePost: updatePost
    }

    useEffect(() => {
        if (typeof (post.series) !== 'string') {
            setSeries('')
        }
    }, [])

    if (session) {
        return (
            <>
                <PostEdit titlename="編輯" title={title} content={content} message={message} series={series} tags={tags} csrfToken={csrfToken} alt={alt} coverImage={coverImage} changedImage={changedImage}
                    set={{ setTitle: setTitle, setContent: setContent, setTags: setTags, setSeries: setSeries, setAlt: setAlt, setCoverImage: setCoverImage, setChangedImage: setChangedImage }}
                    functions={functions} />
            </>
        )
    }
    else {
        return (
            <h1>尚未登入無法進行此操作</h1>
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

    //post
    const post = await Posts.findOne({ id: context.query.id }).lean();
    if (post) {
        post._id = post._id.toString();
    }

    //author
    const author = await Users.findOne({ _id: post.author }).select("id").lean();

    if (session.user.id != author.id) {
        return {
            redirect: { destination: "/" }
        }
    }
    post.author = post.author.toString()
    //tags
    for (let i = 0; i < post.tags.length; i++) {
        const tag = await Tags.findOne({ _id: post.tags[i] }).select("name").lean();
        post.tags[i] = tag.name;
    }
    //series
    if (post.hasOwnProperty("series") && post.series) {
        if (post.series.hasOwnProperty("id")) {
            const series = await Series.findOne({ _id: post.series.id }).lean();
            post.series = series.name;
        }
    }

    const csrfToken = await getCsrfToken(context);

    return {
        props: { csrfToken: csrfToken, post: post },
    }
}