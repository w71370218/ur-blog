import postStyles from '../../styles/PostList.module.css';

const PostEditLayout = ({ children }) => {
    return (
        <>
            <div className={`${postStyles.container} row h-100`}>
                <div className='col w-50'>
                    {children[0]}
                </div>
                <div className='col me-md-3 w-50'>
                    {children[1]}
                </div>
            </div>
        </>
    )
}
export default PostEditLayout