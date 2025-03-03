import React from 'react';
import { NavLink } from 'react-router-dom';

function MenuItem() {
  return (
        <React.Fragment>
          <div className="navBar">
        <li> <NavLink className="MenuLink" exact to="/" title="HOME"> home</NavLink></li>
        <li> <NavLink className="MenuLink" to="/Cv" title="CV" > Cv</NavLink></li>
        <li><NavLink className="MenuLink" to="/Projects" title="PROJECTS" > projects</NavLink></li>
          </div>
        </React.Fragment>
  );
}

export default MenuItem;
