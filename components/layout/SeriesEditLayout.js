import postStyles from '../../styles/PostList.module.css';
import Breadcrumb from '../Breadcrumbs';

const SeriesEditLayout = ({ children, titlename, id }) => {
    return (
        <>
            <main>
                <div className='container '>
                    <div className='my-md-5 my-3'>
                        <Breadcrumb id={id} />
                        <div className={`${postStyles.container} row h-100`}>
                            <div className='col w-50'>
                                <h3>{`${titlename}系列`}</h3>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default SeriesEditLayout