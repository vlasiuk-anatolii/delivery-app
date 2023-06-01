import React from 'react';
import logo from '../../images/svg/logo.svg';

export function Footer() {
  return (
    <footer className="bg-white p-6 m-4 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
      <div className="flex w-[150px] mr-8">
        <a href="#" className="m-1.5 p-1.5">
          <span className="sr-only">VAM</span>
          <img className="h-8 w-auto" src={logo} alt="logo" />
        </a>
      </div>
    </footer>
  )
}

