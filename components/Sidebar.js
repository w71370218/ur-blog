import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Sidebar.module.css'

const Sidebar = () => {
    const ref = useRef(null);
    const [top, setTop] = useState(0);
    useEffect(() => {
        setTop(ref.current.parentElement.offsetTop);
    }, [])
    return (
        <>
            <div ref={ref}>
                <div className={` ms-5 p-5 bg-light rounded sticky-top`} style={{ top: top }}>
                    <div className="me-5">
                        <h5>分類</h5>
                        <ul className="list-unstyled components mb-5">
                            <li >
                                <a classsName="dropdown-toggle" data-bs-toggle="collapse" href="#pageSubmenu1" role="button" aria-expanded="false" aria-controls="pageSubmenu1">Mens Shoes</a>
                                <ul className="collapse list-unstyled" id="pageSubmenu1">
                                    <li><a href="#"><span className="dropdown-item fa fa-chevron-right mr-2"></span> Casual</a></li>
                                    <li><a href="#"><span className="dropdown-item fa fa-chevron-right mr-2"></span> Football</a></li>
                                    <li><a href="#"><span className="dropdown-item fa fa-chevron-right mr-2"></span> Jordan</a></li>
                                    <li><a href="#"><span className="dropdown-item fa fa-chevron-right mr-2"></span> Lifestyle</a></li>
                                    <li><a href="#"><span className="dropdown-item fa fa-chevron-right mr-2"></span> Running</a></li>
                                    <li><a href="#"><span className="dropdown-item fa fa-chevron-right mr-2"></span> Soccer</a></li>
                                    <li><a href="#"><span className="dropdown-item fa fa-chevron-right mr-2"></span> Sports</a></li>
                                </ul>
                            </li>
                            <li>
                                <a classsName="dropdown-toggle" data-bs-toggle="collapse" href="#pageSubmenu2" role="button" aria-expanded="false" aria-controls="pageSubmenu2">Womens Shoes</a>
                                <ul className="collapse list-unstyled" id="pageSubmenu2">
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Casual</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Football</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Jordan</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Lifestyle</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Running</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Soccer</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Sports</a></li>
                                </ul>
                            </li>
                            <li>
                                <a classsName="dropdown-toggle" data-bs-toggle="collapse" href="#pageSubmenu3" role="button" aria-expanded="false" aria-controls="pageSubmenu3">Accessories</a>
                                <ul className="collapse list-unstyled" id="pageSubmenu3">
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Nicklace</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Ring</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Bag</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Sacks</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Lipstick</a></li>
                                </ul>
                            </li>
                            <li>
                                <a classsName="dropdown-toggle" data-bs-toggle="collapse" href="#pageSubmenu4" role="button" aria-expanded="false" aria-controls="pageSubmenu4">Clothes</a>
                                <ul className="collapse list-unstyled" id="pageSubmenu4">
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Jeans</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> T-shirt</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Jacket</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Shoes</a></li>
                                    <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Sweater</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="me-5 pe-5">
                        <div className="mb-5">
                            <h5>標籤雲</h5>
                            <div className="tagcloud">
                                <a href="#" className="tag-cloud-link">dish</a>
                                <a href="#" className="tag-cloud-link">menu</a>
                                <a href="#" className="tag-cloud-link">food</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar