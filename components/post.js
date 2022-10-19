import Link from 'next/link'
import styles from '../styles/PostList.module.css'
import TagGroup from './TagGroup';
import Markdown from './Markdown';

const Post = ({ post }) => {
    return (
        <div className={styles['blog-post']}>
            <div className={styles['shadow']}></div>
            <div className="copy">
                <Link href={`post/${post.id}`} >
                    <a>
                        <h1>{post.title}</h1>
                    </a>
                </Link>
                <TagGroup tags={post.tags} />
                <p>

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