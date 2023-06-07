// Selectors - a function receiving Redux state and returning some data from it
import { IRootState } from '../react-app-env';
export const getSelectedCart = (state: IRootState) => state.selectedcart;
export const getCurrentProducts = (state: IRootState) => state.currentProducts;
export const getAllProducts = (state: IRootState) => state.allProducts;
export const getError = (state: IRootState) => state.error;
export const getAllShops = (state: IRootState) => state.allShops;
export const getCoupons = (state: IRootState) => state.coupons;
export const getCurrentTotal = (state: IRootState) => state.currentTotal;
