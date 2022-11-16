import Sidebar from '../Sidebar';
import Breadcrumb from '../Breadcrumbs';
import useRWD from '../useRWD';
import postStyles from '../../styles/PostList.module.css';

const SidebarLayout = ({ children }) => {
    const device = useRWD();
    return (
        <div className='container'>
            <div className='mt-md-5'>
                <Breadcrumb id={children.props.id} />
            </div>
            <div className={`${postStyles.container} row mb-5`}>
                <div className='col-sm-8'>
                    {children}
                </div>
                {device === "PC" &&
                    <div className='col-sm-4'>
                        <Sidebar />
                    </div>
                }

            </div>
        </div>
    )
}
export default SidebarLayout