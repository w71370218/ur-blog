import Head from 'next/head'
import SeriesEditLayout from '../layout/SeriesEditLayout'
import Title from '../Title';
import postStyle from '../../styles/Post_edit.module.css'

const SeriesEdit = ({ titlename, name, description, message, csrfToken, set, functions }) => {

    return (
        <>
            <Title title={`${titlename}系列`} />
            <Head>
                <meta name="description" description="UR的施鹽小天地" />
            </Head>
            <SeriesEditLayout titlename={titlename} id={name}>
                <form method="POST" className="post-form mb-3" encType="multipart/form-data" onKeyDown={e => { { functions.dontSubmit(e) } }}>
                    <p style={{ color: 'red' }}>{message}</p>
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <div className="form-floating mb-3 w-100">
                        <input id="floatingTitle" className={`form-control `} name="name" type="text"
                            value={name} onChange={e => { set.setName(e.target.value) }} required />
                        <label className="form-label" for="floatingTitle">標題</label>
                    </div>
                    <div className="form-floating mb-3 w-100">
                        <textarea id="description" className={`form-control `}
                            name="description" style={{ height: '50vh' }}
                            value={description} onChange={e => { set.setDescription(e.target.value) }}></textarea>
                        <label className="form-label" for="description">描述</label>
                    </div>

                    <p style={{ color: 'red' }}>{message}</p>
                    {titlename === "新增" ?
                        (<button type="submit" className="save btn btn-dark" onClick={(e) => { { functions.publishSeries(e) } }}>新增</button>)
                        : (<button type="submit" className="save btn btn-dark" onClick={(e) => { { functions.updateSeries(e) } }}>編輯</button>)
                    }

                </form>
            </SeriesEditLayout>
        </>
    )

}

export default SeriesEdit