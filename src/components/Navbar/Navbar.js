import React from 'react';
import { logo } from '../../assets';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="nav-wrapper">
        <div className="nav-content">
          <img src={logo} alt='logo'></img>
         <p className='nav-name'>E-com Seller</p>
        </div>
        <hr className='hr-line'></hr>
      </nav>
  )
}

export default Navbar