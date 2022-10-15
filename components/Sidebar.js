const Sidebar = () => {
    return (
        <div className="p-4 pt-5">
            <h5>Categories</h5>
            <ul className="list-unstyled components mb-5">
                <li>
                    <a href="#pageSubmenu1" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Mens Shoes</a>
                    <ul className="collapse list-unstyled" id="pageSubmenu1">
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
                    <a href="#pageSubmenu2" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Mens Shoes</a>
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
                    <a href="#pageSubmenu3" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Accessories</a>
                    <ul className="collapse list-unstyled" id="pageSubmenu3">
                        <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Nicklace</a></li>
                        <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Ring</a></li>
                        <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Bag</a></li>
                        <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Sacks</a></li>
                        <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Lipstick</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#pageSubmenu4" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Clothes</a>
                    <ul className="collapse list-unstyled" id="pageSubmenu4">
                        <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Jeans</a></li>
                        <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> T-shirt</a></li>
                        <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Jacket</a></li>
                        <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Shoes</a></li>
                        <li><a href="#"><span className="fa fa-chevron-right mr-2"></span> Sweater</a></li>
                    </ul>
                </li>
            </ul>
            <div className="mb-5">
                <h5>Tag Cloud</h5>
                <div className="tagcloud">
                    <a href="#" className="tag-cloud-link">dish</a>
                    <a href="#" className="tag-cloud-link">menu</a>
                    <a href="#" className="tag-cloud-link">food</a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar