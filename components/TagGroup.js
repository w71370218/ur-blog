import styles from '../styles/TagGroup.module.css'
import tagStyle from '../styles/Tag.module.css'
import Link from 'next/link'

const TagGroup = ({ tags }) => {
    return (
        <div className={`${styles['tag-group']} mb-3`}>
            {tags.map(tag => (
                <Link href={`/tag/${tag.id}`} key={tag._id}>
                    <a className='me-1'>
                        <span className={`${tagStyle.tag} badge badge-secondary`}>
                            {tag.name}
                        </span>
                    </a>
                </Link>
            ))}
        </div>
    )
}

export default TagGroup