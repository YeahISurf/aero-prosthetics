"use client";

import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface BurgerMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  toggle: () => void;
}

const BurgerMenu = forwardRef<HTMLButtonElement, BurgerMenuProps>(
  ({ isOpen, toggle, className = '', ...props }, ref) => {
    // Handle click, touch and keyboard events
    const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
      // Prevent default only for touch events to avoid double-firing
      if ('touches' in e) {
        e.preventDefault();
      }
      toggle();
    };

    // Handle keyboard events for accessibility
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    };

    return (
      <BurgerWrapper className={className} {...props}>
        <div 
          className={`burger ${isOpen ? 'is-open' : ''}`}
          onClick={handleInteraction}
          onTouchEnd={handleInteraction}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <input 
            type="checkbox" 
            checked={isOpen} 
            readOnly 
          />
          <span />
          <span />
          <span />
          <button ref={ref} type="button" className="absolute opacity-0 h-0 w-0" aria-hidden="true" tabIndex={-1} />
        </div>
      </BurgerWrapper>
    );
  }
);

BurgerMenu.displayName = "BurgerMenu";

const BurgerWrapper = styled.div`
  .burger {
    position: relative;
    width: 32px;
    height: 24px;
    background: transparent;
    cursor: pointer;
    display: block;
    padding: 10px;
    margin: -10px;
    touch-action: manipulation;
  }

  .burger input {
    display: none;
  }

  .burger span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: currentColor;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
  }

  .burger span:nth-of-type(1) {
    top: 0px;
    transform-origin: left center;
  }

  .burger span:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
  }

  .burger span:nth-of-type(3) {
    top: 100%;
    transform-origin: left center;
    transform: translateY(-100%);
  }

  /* Styles for the X state */
  .burger input:checked ~ span:nth-of-type(1) {
    transform: rotate(45deg);
    top: -2px;
    left: 5px;
  }

  .burger input:checked ~ span:nth-of-type(2) {
    width: 0%;
    opacity: 0;
  }

  .burger input:checked ~ span:nth-of-type(3) {
    transform: rotate(-45deg);
    top: 22px;
    left: 5px;
  }

  /* Active state styling */
  .burger.is-open span {
    background-color: var(--color-primary-600);
  }

  @media (prefers-color-scheme: dark) {
    .burger.is-open span {
      background-color: var(--color-primary-400);
    }
  }
`;

export default BurgerMenu; 