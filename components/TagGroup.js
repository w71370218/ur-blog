import styles from '../styles/TagGroup.module.css'
import tagStyle from '../styles/Tag.module.css'
import Link from 'next/link'
import { useRouter } from "next/router";

const TagGroup = ({ tags }) => {
    const router = useRouter();
    return (
        <div className={`${styles['tag-group']} mb-3`}>
            {tags.map(tag => (
                <a className='me-1' key={tag._id} onClick={() => { router.push(`/tag/${tag.id}`); }}>
                    <span className={`${tagStyle.tag} badge badge-secondary`}>
                        {tag.name}
                    </span>
                </a>
            ))}
        </div>
    )
}

export default TagGroup