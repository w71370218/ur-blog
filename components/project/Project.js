import Link from 'next/link'
import Image from 'next/image';
import getSVG from '../../components/getSVG'
import styles from '../../styles/PostList.module.css'

const Project = ({ project }) => {
    return (
        <div className={styles['blog-post']}>
            <div className={styles['shadow']}></div>
            <div className="copy">
                {project.cover &&
                    <Link href={`/project/${project.id}`} >
                        <a>
                            <div className={`w-100 d-flex justify-content-center align-items-center mb-2 ${styles.cover}`}>
                                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                    <Image layout='fill' objectFit='contain' className="rounded-top" src={`/static/media/img/project/cover/${project.cover.url}`} alt={project.cover.alt} />
                                </div>
                            </div>
                        </a>
                    </Link>
                }
                <Link href={`project/${project.id}`} >
                    <a>
                        <h1>{project.name}</h1>
                    </a>
                </Link>
                <p className="text-secondary">
                    <span>{project.time}</span>
                </p>
                {
                    project.description &&
                    (<>
                        <hr />
                        <div className={styles['blog-post-content']}>
                            {project.description.replace(/!\[](.+)/g, ' ').replace(/<video.+<\/video>/g, ' ').substring(0, 300)}
                        </div>
                        <Link href={`project/${project.id}`} >
                            <a>查看完整介紹</a>
                        </Link>
                    </>)
                }
                <br />
                <br />
                <div className='w-100 d-flex btn-group' role="group" aria-label="Basic checkbox toggle button group">
                    {
                        project.link &&
                        (<Link href={project.link}>
                            <a target='_blank' className='btn btn-outline-secondary'>
                                {getSVG('Link 45deg')} 線上觀看連結
                            </a>
                        </Link>)
                    }

                    {
                        project.code &&
                        (<Link href={project.code}>
                            <a target='_blank' className='btn btn-outline-secondary'>
                                {getSVG('code')} 原始碼
                            </a>
                        </Link>)
                    }
                </div>

            </div>
        </div >
    );
}

export default Project