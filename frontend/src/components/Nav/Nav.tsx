/* eslint-disable array-callback-return */
import './Nav.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return (
    <div className="flex flex-row">
      <ul className="flex flex-row">
        <li
          className="nav__menuitem"
        >
          <NavLink
            to="/"
            className={({ isActive }) => (isActive
              ? 'nav__is-active nav__navlink'
              : 'nav__navlink')}
          >
            home
          </NavLink>
        </li>

        <li className="nav__menuitem">
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive
              ? 'nav__is-active nav__navlink'
              : 'nav__navlink')}
          >
            cart
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

