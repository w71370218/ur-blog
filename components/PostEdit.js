import Head from 'next/head'
import { useState } from "react";
import Markdown from './Markdown';
import PostEditLayout from './layout/PostEditLayout'
import Title from './Title';
import style from '../styles/TagInput.module.css'
import postStyle from '../styles/Post_edit.module.css'

let selectedTags = []

const PostEdit = ({ titlename, title, content, message, tags, series, csrfToken,
    set, functions }) => {
    const [tag_predict_data, setTagPredictData] = useState(null)
    const [tag_input, setTagIpunt] = useState('')
    const fetchedData = false;
    let tag_data;

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

    const predictSearch = async (value) => {
        setTagIpunt(value)
        if (value === '') {
            setTagPredictData(null)
        }
        else {
            if (!fetchedData) {
                const res = await fetch('/api/predictSearch', {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ schema: "tags" }),
                })
                tag_data = await res.json()
                if (res.ok) {
                    fetchedData = true;
                }
            }
            if (fetchedData) {
                const result = tag_data.filter((tag) => tag.name.includes(value))
                setTagPredictData(result)
            }
        }
    }

    return (
        <>
            <Title title={`${titlename}貼文`} />
            <Head>
                <meta name="description" content="UR的施鹽小天地" />
            </Head>
            <PostEditLayout titlename={titlename}>
                <form method="POST" className="post-form mb-3" encType="multipart/form-data" onKeyDown={e => { { functions.dontSubmit(e) } }}>
                    <p style={{ color: 'red' }}>{message}</p>
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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
                                onChange={(e) => predictSearch(e.target.value)} value={tag_input}
                            />
                            <label className="form-label" for="tags">標籤</label>
                            {tag_predict_data ?
                                (<ul className={`${postStyle['words-menu']} ${postStyle['show']}`}>
                                    {tag_predict_data.map((tag_p, index) => (
                                        <li key={index} ><a href='#' onClick={(e) => predictAddTags(e)} className={`${postStyle['words-item']}`}>{tag_p.name}</a></li>
                                    ))
                                    }
                                </ul>
                                )
                                : (<ul className={`${postStyle['words-menu']}`}></ul>)
                            }
                        </div>
                    </div>

                    <div className="form-floating mb-3 w-100">
                        <input className={`form-control`} name="series" type="text" id="series"
                            value={series} onChange={e => { set.setSeries(e.target.value) }} />
                        <label className="form-label" for="series">系列</label>
                    </div>

                    <p style={{ color: 'red' }}>{message}</p>
                    {titlename === "新增" ?
                        (<button type="submit" className="save btn btn-dark" onClick={(e) => { { functions.publishPost(e) } }}>新增</button>)
                        : (<button type="submit" className="save btn btn-dark" onClick={(e) => { { functions.updatePost(e) } }}>編輯</button>)
                    }

                </form>

                <>
                    <h3>預覽</h3>
                    <div className={`${postStyle.preview} border mb-3`}>
                        <Markdown>{content}</Markdown>
                    </div>
                </>
            </PostEditLayout>

        </>
    )

}

export default PostEdit