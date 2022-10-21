import postStyles from '../../styles/PostList.module.css';

const SeriesEditLayout = ({ children, titlename }) => {
    return (
        <>
            <main>
                <div className='container '>
                    <div className={`${postStyles.container} row h-100`}>
                        <div className='col w-50'>
                            <h3>{`${titlename}系列`}</h3>
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default SeriesEditLayout