import Sidebar from '../Sidebar';
import Breadcrumb from '../Breadcrumbs';
import useRWD from '../useRWD';
import postStyles from '../../styles/PostList.module.css';

const SidebarLayout = ({ children }) => {
    const device = useRWD();
    return (
        <div className='container'>
            <div className={`${postStyles.container} row`}>
                <div className='col-sm-8 my-md-5 my-3'>
                    <div>
                        <Breadcrumb id={children.props.id} />
                    </div>
                    {children}
                </div>
                {device === "PC" &&
                    <div className='col-sm-4 border-start border-white'>
                        <Sidebar />
                    </div>
                }
            </div>
        </div>
    )
}
export default SidebarLayout