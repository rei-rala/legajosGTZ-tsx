import React from "react";

import { NavLink } from "react-router-dom";

import "./nav.css";

const Nav: React.FC = () => (
  <nav className="navContainer">
    <ul className="navList">
      <li>
        <NavLink to="/asignacion" activeClassName="onPage">
          Asignacion
        </NavLink>
      </li>
      <li>
        <NavLink to="/analistas" activeClassName="onPage">
          Analistas
        </NavLink>
      </li>
      <li>
        <NavLink to="/legajos" activeClassName="onPage">
          Legajos
        </NavLink>
      </li>
      <li>
        <NavLink to="/workflow" activeClassName="onPage">
          Workflow
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
