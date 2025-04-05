import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    // { name: 'Assessment', path: '/assessment' },
    { name: 'Products', path: '/products' },
    // { name: 'Calculator', path: '/calculator' },
    // { name: 'Installation', path: '/installation' },
    { name: 'Progress', path: '/progress' },
    // { name: 'Resources', path: '/resources' },
  ];

  return (
    <header className="bg-[#7F9268] shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src='/logo.png' className='size-12'/>
            <span className="text-2xl font-bold text-gray-800">Greenify</span>
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
                      : 'text-gray-700 hover:text-[#DDE8C5]'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* User Profile */}
          <div className="hidden md:flex items-center">
            <button className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors duration-200">
              <User className="h-5 w-5" />
              <span className="font-medium">Account</span>
            </button>
          </div>

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
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}

            <div className="pt-2 border-t border-gray-200">
              <button className="flex items-center space-x-2 py-2 px-4 text-gray-700 hover:text-primary transition-colors duration-200">
                <User className="h-5 w-5" />
                <span className="font-medium">Account</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;