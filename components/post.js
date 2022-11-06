import Link from 'next/link'
import styles from '../styles/PostList.module.css'
import TagGroup from './TagGroup';
import Markdown from './Markdown';

const Post = ({ post }) => {
    return (
        <div className={`${styles['blog-post']} pointer w-100`}>
            <div className={styles['shadow']}></div>
            <div className="copy">
                {post.cover &&
                    <Link href={`/post/${post.id}`} >
                        <a>
                            <div className={`w-100 d-flex justify-content-center align-items-center ${styles.cover}`}>
                                <img src={post.cover.url} alt={post.cover.alt} />
                            </div>
                        </a>
                    </Link>
                }
                <Link href={`/post/${post.id}`} >
                    <a>
                        <h1>{post.title}</h1>
                    </a>
                </Link>
                {post.tags[0] && <TagGroup tags={post.tags} />}
                <p className="text-secondary">
                    <span>發表於 {new Date(post.publishedTime).toLocaleString()}</span>
                    <span className="blog-post-meta"> by {post.author.username}</span>
                </p>
                <hr />
                <div className={styles['blog-post-content']}>
                    <Markdown>{post.content}</Markdown>
                </div>

            </div>
        </div >
    );
}

export default Post