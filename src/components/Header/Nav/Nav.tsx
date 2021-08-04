import React from 'react'

import { NavLink } from 'react-router-dom';

import  './nav.css'

const Nav: React.FC = () =>  (
<nav className='navContainer'>
  <ul className='navList'>
    <li><NavLink to='/'> Opcion uno</NavLink></li>
    <li><NavLink to='/'> Opcion dos</NavLink></li>
    <li><NavLink to='/'> Opcion tres</NavLink></li>
  </ul>
</nav>
)


export default Nav;