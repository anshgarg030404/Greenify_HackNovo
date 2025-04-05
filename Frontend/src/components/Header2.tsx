import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header2: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'SignUp', path: '/signup' },
    // { name: 'Assessment', path: '/assessment' },
    // { name: 'Calculator', path: '/calculator' },
    // { name: 'Progress', path: '/progress' },
    // { name: 'Resources', path: '/resources' },
  ];

  return (
    <header className="bg-[#5A6B47] shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                {/* <Leaf className="h-8 w-8 text-primary" /> */}
                <img src='/logo.png' className='size-10'/>
                <span className="text-2xl font-bold text-gray-200">Greenify</span>
              </Link>
    
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `text-base font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-[#DDE8C5] border-b-2 border-[#DDE8C5]'
                          : 'text-gray-200 hover:text-gray-400'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
    
              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-700 hover:text-primary"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
    
            {/* Mobile Navigation */}
            {isMenuOpen && (
              <nav className="md:hidden py-4 space-y-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `block py-2 px-4 text-base font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-primary bg-green-50 rounded-lg'
                          : 'text-gray-200 hover:text-primary hover:bg-gray-50 rounded-lg'
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            )}
          </div>
        </header>
  );
};

export default Header2;