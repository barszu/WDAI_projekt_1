import { Outlet, Link } from "react-router-dom";

// import './styles/testcss.css';
import './styles/navigation.css'

const Navigation = () => {
    return (
        <>
            <header className="header-nav">
                <h1 className="logo">Fajny Pasek Menu ;)</h1>
                <input type="checkbox" id="menu-bar" />
                <label htmlFor="menu-bar">Menu</label>

                <nav className="navbar">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">ProductList</Link></li>
                        <li><Link to="/fancyProducts">FancyProductList</Link></li>
                    </ul>
                </nav>
            </header>
            <p className='nav-brake'/>
            <Outlet />
        </>
    )
};

export default Navigation;