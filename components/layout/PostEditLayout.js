import postStyles from '../../styles/PostList.module.css';

const PostEditLayout = ({ children }) => {
    return (
        <>
            <main>
                <div className='container '>
                    <div className='my-md-5 my-3'>
                        <div className={`${postStyles.container} row h-100`}>
                            <div className='col w-50'>
                                {children[0]}
                            </div>
                            <div className='col w-50'>
                                {children[1]}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default PostEditLayout