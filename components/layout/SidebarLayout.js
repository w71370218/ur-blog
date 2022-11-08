import Sidebar from '../Sidebar';
import Breadcrumb from '../Breadcrumbs';
import postStyles from '../../styles/PostList.module.css';

const SidebarLayout = ({ post, series, children }) => {
    return (
        <div className='container'>
            <div className='mt-5'>
                <Breadcrumb post={post} series={series} />
            </div>
            <div className={`${postStyles.container} row mb-5`}>
                <div className='col-sm-8'>
                    {children}
                </div>
                <div className='col-sm-4'>
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}
export default SidebarLayout