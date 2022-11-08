import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import project_list from "../../../public/project_list"
import Title from '../../../components/Title'
import SidebarLayout from '../../../components/layout/SidebarLayout'
import Markdown from '../../../components/Markdown';
import styles from '../../../styles/PostList.module.css'
import clock_svg from '../../../public/static/svg/clock.svg'
import person_svg from '../../../public/static/svg/person.svg'

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
            <SidebarLayout id={props.project.name}>
                <div className={`${styles['post-list']} ${styles['post-area']} w-100`}>
                    <div className={``}>
                        {props.project.cover &&
                            <div className={`w-100 d-flex justify-content-center align-items-center ${styles.cover}`}>
                                <img className="rounded-top" src={props.project.cover.url} alt={props.project.cover.alt} />
                            </div>
                        }
                        <div className={`pb-5 px-md-5 px-3 ${!props.project.cover ? ("pt-md-5 pt-3") : ("pt-3")}`}>

                            <h1 className="mb-3">{props.project.name}</h1>
                            <div className="mb-3">
                                <p>
                                    <Image src={person_svg.src} width={person_svg.width} height={person_svg.height} />
                                    <span> UR</span>
                                </p>
                            </div>
                            <div className="date mb-3">
                                <div>
                                    <Image src={clock_svg.src} width={clock_svg.width} height={clock_svg.height} />
                                    <span> {props.project.time}</span>
                                </div>
                            </div>
                            <hr />
                            <div className={styles['content']}>
                                <Markdown>{props.project.description}</Markdown>
                            </div>
                            <div className='w-100 d-flex btn-group' role="group" aria-label="Basic checkbox toggle button group">
                                {
                                    props.project.link &&
                                    (<Link href={props.project.link}>
                                        <a target='_blank' className='btn btn-outline-secondary'>
                                            線上觀看連結
                                        </a>
                                    </Link>)
                                }

                                {
                                    props.project.code &&
                                    (<Link href={props.project.code}>
                                        <a target='_blank' className='btn btn-outline-secondary'>
                                            原始碼
                                        </a>
                                    </Link>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarLayout>
        </main>
    </>)
}
export default Project

export async function getServerSideProps(context) {
    console.log(project_list[context.query.id - 1])
    if (project_list[context.query.id - 1]) {
        return { props: { project: project_list[context.query.id - 1] } }
    }
    return { props: { message: "此作品集不存在或已經刪除了" } }
}