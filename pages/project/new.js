import { getSession, getCsrfToken } from "next-auth/react";
import Router from 'next/router';
import { useState } from "react";
import { useSession } from "next-auth/react"
import SeriesEdit from "../../components/series/SeriesEdit"

export default function NewSeries({ csrfToken }) {
    const { data: session } = useSession({ required: true });
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState(null);

    const dontSubmit = (event) => {
        if (event.key === "Enter" && event.target.id !== "description") {
            event.preventDefault();
        }
    }

    const publishSeries = async (e) => {
        e.preventDefault();
        setMessage(null)
        const req = { name: name, description: description };
        const res = await fetch('/api/series/new', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(req),
        })
        let data = await res.json()
        if (data.message) {
            setMessage(data.message)
        }
        if (data.message == "succeed") {
            return Router.push({
                pathname: '/series/[id]',
                query: { id: data.id },
            })
        }
    }
    const functions = {
        dontSubmit: dontSubmit,
        publishSeries: publishSeries
    }

    if (session) {
        return (
            <>
                <SeriesEdit titlename="新增" name={name} description={description} message={message} csrfToken={csrfToken}
                    set={{ setName: setName, setDescription: setDescription }}
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
    const csrfToken = await getCsrfToken(context);

    return {
        props: { csrfToken: csrfToken },

    }
}