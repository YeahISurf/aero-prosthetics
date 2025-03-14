"use client";

import { useState } from 'react';
import BurgerMenu from '../ui/BurgerMenu';

export default function BurgerMenuExample() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className="relative">
      {/* The BurgerMenu toggle button */}
      <BurgerMenu 
        isOpen={isMenuOpen}
        toggle={toggleMenu}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="text-gray-700 hover:text-primary-600"
      />
      
      {/* Your custom menu content that appears when menu is open */}
      {isMenuOpen && (
        <div className="menu-content">
          {/* Your menu content here */}
          <ul className="mt-2 p-4 bg-white shadow-lg rounded-md absolute right-0 top-full">
            <li className="py-2">Menu Item 1</li>
            <li className="py-2">Menu Item 2</li>
            <li className="py-2">Menu Item 3</li>
          </ul>
        </div>
      )}
    </div>
  );
} 