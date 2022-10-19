import Sidebar from '../Sidebar';
import postStyles from '../../styles/PostList.module.css';

const SidebarLayout = ({ children }) => {
    return (
        <div className='container'>
            <div className={`${postStyles.container} row`}>
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