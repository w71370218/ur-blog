import postStyles from '../../styles/PostList.module.css';

const PostEditLayout = ({ children, titlename }) => {
    return (
        <>
            <main>
                <div className='container '>
                    <div className={`${postStyles.container} row h-100`}>
                        <div className='col w-50'>
                            <h3>{`${titlename}貼文`}</h3>
                            {children[0]}
                        </div>
                        <div className='col w-50'>
                            {children[1]}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default PostEditLayout