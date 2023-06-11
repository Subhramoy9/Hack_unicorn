import React from 'react';
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
   <nav className="navbar">
      <div className="container">
        <div className="logo">
          
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/">About</NavLink>
            </li>
            <li>
              <NavLink to="/">Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Navbar;
