import React from 'react';
import './Header.css';
import logo from '../../assets/logo.jpg';


const Header = () => {
    return (
        <nav className='header'>
            <img src={logo} className="w-full h-auto" alt="" />
            
        </nav>
    );
};

export default Header;