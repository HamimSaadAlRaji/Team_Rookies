import React from 'react';
import './Header.css';
import logo from '../../assets/logo.jpg';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Header = () => {
    return (
        <nav className='header'>
            <img src={logo} className="w-full h-auto" alt="Logo" />
            
            {/* Button to scroll to the map section */}
            <div className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <AnchorLink href="#mapSection">
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
                        Click here to go to map
                    </button>
                </AnchorLink>
            </div>

            {/* Button to scroll to the CrimeMap section */}
            <div className="flex justify-center items-center absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <AnchorLink href="#crimeMapSection">
                    <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
                        Click here to go to Crime Map
                    </button>
                </AnchorLink>
            </div>
        </nav>
    );
};

export default Header;
