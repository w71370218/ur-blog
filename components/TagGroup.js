import styles from '../styles/TagGroup.module.css'
import tagStyle from '../styles/Tag.module.css'
import Link from 'next/link'
import getSVG from './getSVG'

const TagGroup = ({ tags, all }) => {
    let all_class = ""
    if (all) {
        all_class = styles.all
    }
    return (
        <div className={`${styles['tag-group']} ${all_class} tag-group mb-3 h-100`}>
            {tags.map(tag => (
                <Link href={`/tag/${tag.id}`} key={tag._id}>
                    <a className='me-1'>
                        <span className={`${tagStyle.tag} tag badge badge-secondary`}>
                            {getSVG('Tag fill', '1em')}  {tag.name}
                        </span>
                    </a>
                </Link>
            ))}
        </div>
    )
}

export default TagGroup