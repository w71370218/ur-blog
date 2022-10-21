import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import styles from '../../styles/PostList.module.css'
import Loading from '../Loading'
import Series from "./Series"

const SeriesList = () => {
    const { data: session } = useSession();
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    let user = null

    async function fetchProduct() {
        setLoading(true)
        if (session) {
            const user = session.user.id
        }
        const res = await fetch('/api/series/serieslist', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ user: user })
        })
        if (res.ok) {
            const series = await res.json()
            setData(series)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!data) {
            if (session) {
                user = session.user
            }
            fetchProduct();
        }
    }, [session]);

    if (isLoading) {
        return (
            <Loading className="h-100 w-100 d-flex justify-content-center align-self-center" />
        )
    }
    return (
        <div className={`${styles['post-list']} p-1 p-md-5 pt-5`} >
            {data.map(series => (
                <div key={series.id} >
                    <Series series={series} />
                </div>
            ))
            }
        </div >
    )
}

export default SeriesList;