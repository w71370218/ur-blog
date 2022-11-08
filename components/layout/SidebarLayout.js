import Sidebar from '../Sidebar';
import Breadcrumb from '../Breadcrumbs';
import postStyles from '../../styles/PostList.module.css';

const SidebarLayout = ({ id, children }) => {
    return (
        <div className='container'>
            <div className='mt-md-5'>
                <Breadcrumb id={id} />
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