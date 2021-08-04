import React from 'react'

import './header.scss'
import Logo from './Logo/Logo';
import Nav from './Nav/Nav';



const Header: React.FC = () => (
<header className="header">


  <Logo />

  <Nav />

</header>
)


export default Header;