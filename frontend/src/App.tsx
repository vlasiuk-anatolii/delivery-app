import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartPage } from './pages/CartPage/CartPage';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const App = () => {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={(<HomePage />)} />
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="/product/:id" element={<ProductDetailsPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};