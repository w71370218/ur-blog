import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Sidebar.module.css'
import TagCloud from './TagCloud';

const Sidebar = () => {
    const ref = useRef(null);
    const [top, setTop] = useState(0);

    const collapseToggle = (className) => {
        if (className === "dropdown") {
            return "dropup"
        }
        else {
            return "dropdown"
        }
    }
    useEffect(() => {
        setTop(ref.current.getRootNode().getElementsByTagName("nav")[0].offsetHeight);
    }, [])
    return (
        <>
            <div ref={ref} className={`p-5 bg-light rounded `} style={{ top: top, position: "fixed" }}>
                <div className="me-5">
                    <h5>分類</h5>
                    <ul className="list-unstyled components mb-5">
                        <li className="dropdown" onClick={e => e.target.parentElement.className = collapseToggle(e.target.parentElement.className)} >
                            <a className="dropdown-toggle"
                                data-bs-toggle="collapse" href="#pageSubmenu1" role="button" aria-expanded="false" aria-controls="pageSubmenu1">Mens Shoes</a>
                            <ul className="collapse list-unstyled" id="pageSubmenu1">
                                <li><a href="#標題二"><span className="dropdown-item fa fa-chevron-right mr-2"></span> Casual</a></li>
                                <li><a href="#"><span className="dropdown-item fa fa-chevron-right mr-2"></span> Football</a></li>
                                <li><a href="#"><span className="dropdown-item fa fa-chevron-right mr-2"></span> Jordan</a></li>
                                <li><a href="#"><span className="dropdown-item fa fa-chevron-right mr-2"></span> Lifestyle</a></li>
                                <li><a href="#"><span className="dropdown-item fa fa-chevron-right mr-2"></span> Running</a></li>
                                <li><a href="#"><span className="dropdown-item fa fa-chevron-right mr-2"></span> Soccer</a></li>
                                <li><a href="#"><span className="dropdown-item fa fa-chevron-right mr-2"></span> Sports</a></li>
                            </ul>
                        </li>
                        <li className="dropdown" onClick={e => e.target.parentElement.className = collapseToggle(e.target.parentElement.className)}>
                            <a className="dropdown-toggle"
                                data-bs-toggle="collapse" href="#pageSubmenu2" role="button" aria-expanded="false" aria-controls="pageSubmenu2">Womens Shoes</a>
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
                        <li className="dropdown" onClick={e => e.target.parentElement.className = collapseToggle(e.target.parentElement.className)}>
                            <a className="dropdown-toggle" data-bs-toggle="collapse" href="#pageSubmenu3" role="button" aria-expanded="false" aria-controls="pageSubmenu3">Accessories</a>
                            <ul className="collapse list-unstyled" id="pageSubmenu3">
                                <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Nicklace</a></li>
                                <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Ring</a></li>
                                <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Bag</a></li>
                                <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Sacks</a></li>
                                <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Lipstick</a></li>
                            </ul>
                        </li>
                        <li className="dropdown" onClick={e => e.target.parentElement.className = collapseToggle(e.target.parentElement.className)}>
                            <a className="dropdown-toggle" data-bs-toggle="collapse" href="#pageSubmenu4" role="button" aria-expanded="false" aria-controls="pageSubmenu4">Clothes</a>
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
                <div className="mb-5">
                    <h5>標籤雲</h5>
                    <div className="tagcloud bg-white p-4 rounded-3 d-flex flex-wrap justify-content-center">
                        <TagCloud />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar