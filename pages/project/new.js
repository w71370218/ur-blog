import { getSession, getCsrfToken } from "next-auth/react";
import Router from 'next/router';
import { useState } from "react";
import { useSession } from "next-auth/react"
import EditForm from '../../components/EditForm'

export default function NewSeries({ csrfToken }) {
    const { data: session } = useSession({ required: true });
    const [field, setField] = useState({
        csrfToken: csrfToken,
        name: "",
        description: "",
        time: "",
        link: "", code: "",
        cover: {
            url: "",
            alt: ""
        }
    })
    const [message, setMessage] = useState(null);

    if (session) {
        return (
            <>
                <EditForm titlename="新增作品集" submit='project/new'>
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <label className='rounded-top bg-secondary text-light w-100 text-center py-2'>封面圖片</label>
                </EditForm>
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