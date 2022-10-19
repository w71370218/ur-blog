import postStyles from '../../styles/PostList.module.css';

const PostEditLayout = ({ children, titlename }) => {
    return (
        <>
            <main>
                <div className='container '>
                    <div className={`${postStyles.container} row h-100`}>
                        <div className='col w-50'>
                            <h1>{`${titlename}貼文`}</h1>
                            {children[0]}
                        </div>
                        <div className='col me-md-3 w-50'>
                            {children[1]}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default PostEditLayout