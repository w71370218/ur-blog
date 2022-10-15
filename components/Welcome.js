import { useSession } from "next-auth/react"

export default function Welcome() {
    const { data: session } = useSession();
    //console.log(session)
    if (session) {
        return (`Welcome, ${session.user.username}`)
    }
    return ('')

}