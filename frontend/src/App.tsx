import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartPage } from './pages/CartPage/CartPage';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { HistoryPage } from './pages/HistoryPage/HistoryPage';
import { CouponsPage } from './pages/CouponsPage/CouponsPage';
import { APP_KEYS } from '../src/consts';

export const App = () => {
  
  return (
    <div className="App">
      <Routes>
        <Route path={APP_KEYS.ROUTER_KEYS.HOME} element={(<HomePage />)} />
        <Route path={APP_KEYS.ROUTER_KEYS.CART_PAGE} element={<CartPage />} />
        <Route path={APP_KEYS.ROUTER_KEYS.HISTORY_PAGE} element={<HistoryPage />} />
        <Route path={APP_KEYS.ROUTER_KEYS.COUPON_PAGE} element={<CouponsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};