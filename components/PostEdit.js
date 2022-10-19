import Head from 'next/head'
import Markdown from './Markdown';
import PostEditLayout from './layout/PostEditLayout'
import Title from './Title';
import style from '../styles/TagInput.module.css'
import postStyle from '../styles/NewPost.module.css'

const PostEdit = ({ titlename, title, content, message, tags, csrfToken, set, functions }) => {
    return (
        <>
            <Title title={`${titlename}貼文`} />
            <Head>
                <meta name="description" content="UR的施鹽小天地" />
            </Head>
            <main>
                <div className='container '>
                    <h1>{`${titlename}貼文`}</h1>
                    <p style={{ color: 'red' }}>{message}</p>

                    <PostEditLayout>
                        <form method="POST" className="post-form" encType="multipart/form-data" onKeyDown={e => { { functions.dontSubmit(e) } }}>
                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <div className="">
                                <label className="form-label">標題</label>
                                <input className={[postStyle['text-input'], postStyle['sm-input']].join(" ")} name="title" type="text" value={title} onChange={e => { set.setTitle(e.target.value) }} />
                            </div>
                            <div className="">
                                <label className="form-label">內文</label>
                                <textarea id="content" className={[postStyle['text-input'], postStyle['lg-input']].join(" ")} name="content" type="text" value={content} onChange={e => { set.setContent(e.target.value) }}></textarea>
                            </div>

                            <div className="">
                                <label className="form-label">標籤</label>
                                <div className={style["tags-input"]}>
                                    <ul id={style["tags"]}>
                                        {tags.map((tag, index) => (
                                            <li key={index} className={style["tag"]}>
                                                <span className={style['tag-title']}>{tag}</span>
                                                <span className={style['tag-close-icon']}
                                                    onClick={() => { functions.removeTags(index) }}
                                                >
                                                    x
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <input
                                        type="text"
                                        onKeyUp={(e) => { if (e.key === "Enter") { { functions.addTags(e) } } }}
                                        placeholder="以 Enter 新增標籤"
                                    />
                                </div>
                            </div>
                            <p style={{ color: 'red' }}>{message}</p>
                            {titlename === "新增" ?
                                (<button type="submit" className="save btn btn-dark" onClick={(e) => { { functions.publishPost(e) } }}>新增</button>)
                                : (<button type="submit" className="save btn btn-dark" onClick={(e) => { { functions.updatePost(e) } }}>編輯</button>)
                            }

                        </form>

                        <>
                            <h3>預覽</h3>
                            <div className={`${postStyle.preview}`}>
                                <Markdown>{content}</Markdown>
                            </div>
                        </>
                    </PostEditLayout>
                </div>
            </main>
        </>
    )

}

export default PostEdit