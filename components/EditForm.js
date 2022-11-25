import Head from "next/head";
import Title from "./Title"
import Breadcrumb from "./Breadcrumbs";

const EditForm = ({ children, titlename, submit }) => {

    const dontSubmit = (event) => {
        if (event.key === "Enter" && event.target.id !== "description") {
            event.preventDefault();
        }
    }

    return (
        <>
            <Title title={`${titlename}`} />
            <Head>
                <meta name="description" description="UR的施鹽小天地" />
            </Head>
            <Breadcrumb />
            <h3>{`${titlename}`}</h3>
            <form method="POST" className="post-form mb-3" encType="multipart/form-data" onKeyDown={e => { { dontSubmit(e) } }}>
                {children}
            </form>
        </>
    )
}


export default EditForm