import Link from 'next/link'
import styles from '../../styles/PostList.module.css'

const Project = ({ project }) => {
    return (
        <div className={styles['blog-post']}>
            <div className={styles['shadow']}></div>
            <div className="copy">
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
                        (<button className='w-100 btn btn-outline-secondary' type="button">
                            <Link href={project.link} >
                                <a>線上觀看連結</a>
                            </Link>
                        </button>)
                    }

                    {
                        project.code &&
                        (<button className='w-100 btn btn-outline-secondary' type="button">
                            <Link href={project.code} >
                                <a>原始碼</a>
                            </Link>
                        </button>)
                    }
                </div>

            </div>
        </div >
    );
}

export default Project