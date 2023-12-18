import { Outlet, NavLink } from "react-router-dom";
import "./styles/menu.css";

//pasek nawigacji

const Menu = () => {
  return (
    <>
      <header className="header-nav">
        <h1 className="logo">React App</h1>
        <input type="checkbox" id="menu-bar" />
        <label htmlFor="menu-bar">Menu</label>

        <nav className="navbar">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Products List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/protected"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Protected
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <p className="nav-brake" />
      <Outlet />
    </>
  );
};

export default Menu;
