import Link from 'next/link'
import styles from '../../styles/PostList.module.css'
import Markdown from '../Markdown';

const Series = ({ series }) => {
    return (
        <div className={styles['blog-post']}>
            <div className={styles['shadow']}></div>
            <div className="copy">
                <Link href={`series/${series.id}`} >
                    <a>
                        <h1>{series.name}</h1>
                    </a>
                </Link>
                <p className="text-secondary">
                    <span>{new Date(series.createdTime).toLocaleString()}</span>
                </p>
                <p >
                    <span>共 {series.postCount} 篇文章</span>
                </p>
                {
                    series.description &&
                    (<>
                        <hr />
                        <div className={styles['blog-post-content']}>
                            <Markdown>{series.description}</Markdown>
                        </div>
                    </>)
                }

            </div>
        </div >
    );
}

export default Series