import Head from 'next/head'
import { useState, useRef, useEffect } from "react";
import Markdown from './Markdown';
import PostEditLayout from './layout/PostEditLayout'
import Breadcrumb from './Breadcrumbs';
import Title from './Title';
import style from '../styles/TagInput.module.css'
import postStyle from '../styles/Post_edit.module.css'

let selectedTags = []

const PostEdit = ({ titlename, title, content, message, tags, series, alt, coverImage, csrfToken, changedImage,
    set, functions }) => {
    const [tag_predict_data, setTagPredictData] = useState(null)
    const [series_predict_data, setSeriesPredictData] = useState(null)
    const [tag_input, setTagIpunt] = useState('')
    const fetchedData = [false, false];
    const data = [null, null]
    const imageInput = useRef();

    const removeTags = indexToRemove => {
        set.setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = event => {
        if (event.target.value !== "") {
            if (!tags.includes(event.target.value)) {
                set.setTags([...tags, event.target.value]);
                selectedTags = [...tags, event.target.value];
                event.target.value = "";
                setTagIpunt("")
                setTagPredictData(null)
            }
        }
    };

    const predictAddTags = event => {
        if (event.target.innerText !== "") {
            if (!tags.includes(event.target.innerText)) {
                set.setTags([...tags, event.target.innerText]);
                selectedTags = [...tags, event.target.innerText];
                setTagIpunt("")
                setTagPredictData(null)
            }
        }
    };

    const predictSearch = async (type, value) => {
        let t;
        const e = {
            predict_data: [tag_predict_data, series_predict_data],
            input: [tag_input, series],
            setInput: [setTagIpunt, set.setSeries],
            setPredictData: [setTagPredictData, setSeriesPredictData,]
        }
        switch (type) {
            case "tags":
                t = 0
                break;
            case "series":
                t = 1
                break;
        }

        e.setInput[t](value)
        if (value === '') {
            e.setPredictData[t](null)
        }
        else {
            if (!fetchedData[t]) {
                const res = await fetch('/api/predictSearch', {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ schema: type }),
                })
                data[t] = await res.json()
                if (res.ok) {
                    fetchedData[t] = true;
                }
            }
            if (fetchedData[t]) {
                const result = data[t].filter((o) => o.name.includes(value))
                if (result.length !== 0) {
                    e.setPredictData[t](result)
                }
            }
        }
    }
    /*
    const uploadImage = (file) => {
        onFileUpload(file)
    }
     <button className="btn btn-secondary" type="button" id="inputGroupFile" onClick={e => { uploadImage(coverImage) }}>上傳</button>
    */

    const uploadcoverImage = (files) => {
        if (files) {
            set.setCoverImage(files[0])
            if (titlename === "編輯") {
                set.setChangedImage(true)
            }
        }
    }
    const cleancoverImage = () => {
        imageInput.current.value = null
        set.setCoverImage(null)
        if (titlename === "編輯") {
            set.setChangedImage(true)
        }
    }

    return (
        <>
            <Title title={`${titlename}貼文`} />
            <Head>
                <meta name="description" content="UR的施鹽小天地" />
            </Head>
            <PostEditLayout titlename={titlename}>
                <>
                    <Breadcrumb post={title} />
                    <h3>{`${titlename}貼文`}</h3>
                    <form method="POST" className="post-form mb-3" encType="multipart/form-data" onKeyDown={e => { { functions.dontSubmit(e) } }}>
                        <p style={{ color: 'red' }}>{message}</p>
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <div>
                            <label className='rounded-top bg-secondary text-light w-100 text-center py-2'>封面圖片</label>
                            <div className="input-group mb-1 my-1">
                                {coverImage && coverImage !== null && <button className="btn border" type="button" id="inputGroupFile" onClick={e => cleancoverImage()}>X</button>}
                                <input type="file" className="form-control" id="inputGroupFile" accept="image/png, image/jpeg" ref={imageInput} onChange={e => { uploadcoverImage(e.target.files); }} />
                                <div className="mb-3 w-100 ">
                                    <label className='border bg-light w-100 text-center py-1'>圖片替代文字</label>
                                    <input id="floatingAlt" className={`form-control w-100 border rounded-bottom my-1`} name="alt" type="text"
                                        value={alt} onChange={e => { set.setAlt(e.target.value) }} />

                                </div>
                            </div>
                        </div>
                        <div className="form-floating mb-3 w-100">
                            <input id="floatingTitle" className={`form-control `} name="title" type="text"
                                value={title} onChange={e => { set.setTitle(e.target.value) }} required />
                            <label className="form-label" for="floatingTitle">標題</label>
                        </div>
                        <div className="form-floating mb-3 w-100">
                            <textarea id="content" className={`form-control `}
                                name="content" style={{ height: '50vh' }}
                                value={content} onChange={e => { set.setContent(e.target.value) }} required></textarea>
                            <label className="form-label" for="content">內文</label>
                        </div>
                        <div>
                            <ul id={style["tags"]}>
                                {tags.map((tag, index) => (
                                    <li key={index} className={style["tag"]}>
                                        <span className={style['tag-title']}>{tag}</span>
                                        <span className={style['tag-close-icon']}
                                            onClick={() => removeTags(index)}
                                        >
                                            x
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="form-floating mb-3 w-100">
                                <input className={`form-control`} type="text" id="tags"
                                    onKeyUp={(e) => { if (e.key === "Enter") { addTags(e) } }}
                                    placeholder="以 Enter 新增標籤"
                                    onChange={(e) => { predictSearch("tags", e.target.value) }} value={tag_input}
                                />
                                <label className="form-label" for="tags">標籤</label>
                                {tag_predict_data ?
                                    (<ul className={`${postStyle['words-menu']} ${postStyle['show']}`}>
                                        {tag_predict_data.map((tag_p, index) => (
                                            <li key={index} onClick={(e) => predictAddTags(e)} className={`${postStyle['words-item']}`} ><span>{tag_p.name}</span></li>
                                        ))
                                        }
                                    </ul>
                                    )
                                    : (<></>)
                                }
                            </div>
                        </div>

                        <div className="form-floating mb-3 w-100">
                            <input className={`form-control`} name="series" type="text" id="series"
                                value={series} onChange={e => { set.setSeries(e.target.value); predictSearch("series", e.target.value) }} />
                            <label className="form-label" for="series">系列</label>
                            {series_predict_data ?
                                (<ul className={`${postStyle['words-menu']} ${postStyle['show']}`}>
                                    {series_predict_data.map((series_p, index) => (
                                        <li key={index} onClick={(e) => predictAddSeries(e)} className={`${postStyle['words-item']}`} ><span>{series_p.name}</span></li>
                                    ))
                                    }
                                </ul>
                                )
                                : (<></>)
                            }
                        </div>

                        <p style={{ color: 'red' }}>{message}</p>
                        {titlename === "新增" ?
                            (<button type="submit" className="save btn btn-dark" onClick={(e) => { { functions.publishPost(e) } }}>新增</button>)
                            : (<button type="submit" className="save btn btn-dark" onClick={(e) => { { functions.updatePost(e) } }}>編輯</button>)
                        }

                    </form>
                </>
                <>
                    <h3>預覽</h3>
                    <div className={`${postStyle.preview} border mb-3 w-100 `}>
                        {titlename === "編輯" && !changedImage ?
                            (coverImage && (
                                <div className={`w-100 d-flex justify-content-center align-items-center ${postStyle.cover}`}>
                                    <img id="upload-img" src={coverImage} />
                                </div>
                            )) :
                            (coverImage && (
                                <div className={`w-100 d-flex justify-content-center align-items-center ${postStyle.cover}`}>
                                    <img id="upload-img" src={URL.createObjectURL(coverImage)} />
                                </div>
                            ))
                        }
                        <div className='w-100'>
                            <Markdown>{content}</Markdown>
                        </div>

                    </div>
                </>
            </PostEditLayout>

        </>
    )

}

export default PostEdit