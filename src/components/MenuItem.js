import React from 'react';
import {NavLink} from 'react-router-dom';


function MenuItem() {  
  return (
    <nav>
        <ul> 
        <li> <NavLink className = "MenuLink" exact to = "/" title = "HOME"> home</NavLink></li> 
        <li> <NavLink className = "MenuLink" to = "/Cv" title = "CV" > Cv</NavLink></li> 
        <li><NavLink className = "MenuLink" to = "/Projects" title = "PROJECTS" > projects</NavLink></li>
        </ul>
    </nav>
  );
}

export default MenuItem;
