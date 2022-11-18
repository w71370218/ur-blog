import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import project_list from "../../../public/project_list"
import Title from '../../../components/Title'
import Markdown from '../../../components/Markdown';
import styles from '../../../styles/PostList.module.css'
import getSVG from '../../../components/getSVG'
import FontResize from '../../../components/FontResize';

const Project = (props) => {
    if (props.message) {
        return (<>
            <main>
                <h1>{props.message}</h1>
            </main>
        </>)
    }
    return (<>
        <Title title={props.project.name} />
        <Head>
            <meta name="description" content={`${props.project.description.substring(0, 30)}...`} />
            <meta name="Author" content={`UR`} />
            <meta property="og:description" content={`${props.project.description.substring(0, 30)}...`} />
            {props.project.cover && <meta property='og:image' content={`${props.project.cover.url}`} />}
            <meta name="referrer" content="no-referrer" />
        </Head>
        <main>
            <div className={`${styles['post-list']} ${styles['post-area']} w-100`}>
                <div className={``}>
                    {props.project.cover &&
                        <div className={`w-100 d-flex justify-content-center align-items-center ${styles.cover}`}>
                            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                <Image layout='fill' objectFit='contain' className="rounded-top" src={`/static/media/img/project/cover/${props.project.cover.url}`} alt={props.project.cover.alt} />
                            </div>
                        </div>
                    }
                    <div className={`pb-5 px-md-5 px-3 ${!props.project.cover ? ("pt-md-5 pt-3") : ("pt-3")}`}>

                        <h1 className="mb-3">{props.project.name}</h1>
                        <div className="mb-3">
                            <p>
                                {getSVG('person')}
                                <span> UR</span>
                            </p>
                        </div>
                        <div className="date mb-3">
                            <div>
                                {getSVG('clock')}
                                <span> {props.project.time}</span>
                            </div>
                        </div>
                        <div className={styles['content']}>
                            <FontResize>
                                <hr />
                                <Markdown>{props.project.description}</Markdown>
                            </FontResize>
                        </div>
                        <div className='w-100 d-flex btn-group mt-5' role="group" aria-label="Basic checkbox toggle button group">
                            {
                                props.project.link &&
                                (<Link href={props.project.link}>
                                    <a target='_blank' className='btn btn-outline-secondary'>
                                        {getSVG('Link 45deg')} 線上觀看連結
                                    </a>
                                </Link>)
                            }

                            {
                                props.project.code &&
                                (<Link href={props.project.code}>
                                    <a target='_blank' className='btn btn-outline-secondary'>
                                        {getSVG('code')} 原始碼
                                    </a>
                                </Link>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>)
}
export default Project

export async function getServerSideProps(context) {
    if (project_list[context.query.id - 1]) {
        return { props: { project: project_list[context.query.id - 1], SidebarLayout: true, id: project_list[context.query.id - 1].name } }
    }
    return { props: { message: "此作品集不存在或已經刪除了", SidebarLayout: true } }
}