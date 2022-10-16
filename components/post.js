import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";
import gfm from 'remark-gfm';
import Link from 'next/link'
import styles from '../styles/PostList.module.css'
import TagGroup from './TagGroup';

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
                <div className={styles['blog-post-content']}><ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[gfm]}>{post.content}</ReactMarkdown></div>

            </div>
        </div >
    );
}

export default Post