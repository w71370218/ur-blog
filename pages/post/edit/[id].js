import { getSession, getCsrfToken } from "next-auth/react";
import { useState } from "react";
import { useSession } from "next-auth/react"
import Router from 'next/router';
import Posts from '../../../models/posts'
import Users from '../../../models/users'
import Tags from '../../../models/tags'
import PostEdit from "../../../components/PostEdit"

export default function EditPost({ csrfToken, post }) {
    const { data: session } = useSession({ required: true });
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [message, setMessage] = useState(null);
    const [tags, setTags] = useState(post.tags);
    const [series, setSeries] = useState('');

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
        const res = await fetch('/api/post/update', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ id, title, content, tags, user }),
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

    if (session) {
        return (
            <>
                <PostEdit titlename="編輯" title={title} content={content} message={message} series={series} tags={tags} csrfToken={csrfToken}
                    set={{ setTitle: setTitle, setContent: setContent, setTags: setTags, setSeries: setSeries }}
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


    const post = await Posts.findOne({ id: context.query.id }).lean();
    if (post) {
        post._id = post._id.toString();
    }
    const author = await Users.findOne({ _id: post.author }).select("id").lean();

    if (session.user.id != author.id) {
        return {
            redirect: { destination: "/" }
        }
    }
    post.author = post.author.toString()
    for (let i = 0; i < post.tags.length; i++) {
        const tag = await Tags.findOne({ _id: post.tags[i] }).select("name").lean();
        post.tags[i] = tag.name;
    }

    const csrfToken = await getCsrfToken(context);

    return {
        props: { csrfToken: csrfToken, post: post },

    }
}