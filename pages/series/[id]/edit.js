import Router from 'next/router';
import { getSession, getCsrfToken } from "next-auth/react";
import { useState } from "react";
import { useSession } from "next-auth/react"
import SeriesEdit from "../../../components/series/SeriesEdit"
import Series from "../../../models/series"

export default function EditSeries({ csrfToken, series }) {
    const { data: session } = useSession({ required: true });
    const [name, setName] = useState(series.name);
    const [description, setDescription] = useState(series.description);
    const [message, setMessage] = useState(null);

    const dontSubmit = (event) => {
        if (event.key === "Enter" && event.target.id !== "description") {
            event.preventDefault();
        }
    }

    const updateSeries = async (e) => {
        e.preventDefault();
        setMessage(null)
        const req = { id: series.id, name: name, description: description };
        const res = await fetch('/api/series/update', {
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
        updateSeries: updateSeries
    }

    if (session) {
        return (
            <>
                <SeriesEdit titlename="編輯" name={name} description={description} message={message} csrfToken={csrfToken}
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
    const series = await Series.findOne({ id: context.query.id }).lean();
    if (series) {
        series._id = series._id.toString();
    }

    const csrfToken = await getCsrfToken(context);

    return {
        props: { csrfToken: csrfToken, series: series },

    }
}