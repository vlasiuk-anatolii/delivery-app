import { ICoupon, IObjectForCart, IProduct, IShops  } from '../react-app-env';

// Action types - is just a constant. MUST have a unique value.
export enum ActionType {
  SET_SELECTED_CART = 'SET_SELECTED_CART',
  DEL_FROM_CART = 'DEL_FROM_CART',
  SET_CURRENT_PRODUCTS = 'SET_CURRENT_PRODUCTS',
  SET_QUANTITY = 'SET_QUANTITY',
  SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS',
  SET_ERROR = 'SET_ERROR',
  SET_ALL_SHOPS = 'SET_ALL_SHOPS',
  CLEAR_CART = 'CLEAR_CART',
  SET_COUPONS = 'SET_COUPONS',
  SET_TOTAL = 'SET_TOTAL',
}

export interface ISetSelectedCart {
  type: ActionType.SET_SELECTED_CART,
  payload: IObjectForCart,
}

export interface IDelFromCart {
  type: ActionType.DEL_FROM_CART,
  payload: IObjectForCart,
}

export interface ISetCurrentProducts {
  type: ActionType.SET_CURRENT_PRODUCTS,
  payload: IProduct[],
}

export interface ISetQuantity {
  type: ActionType.SET_QUANTITY,
  payload: IObjectForCart,
}

export interface ISetAllProducts {
  type: ActionType.SET_ALL_PRODUCTS,
  payload: IProduct[],
}

export interface ISetError {
  type: ActionType.SET_ERROR,
  payload: string,
}

export interface ISetAllShops {
  type: ActionType.SET_ALL_SHOPS,
  payload: IShops[],
}

export interface IClearCart {
  type: ActionType.CLEAR_CART,
  payload: undefined,
}

export interface ISetCoupons {
  type: ActionType.SET_COUPONS,
  payload: ICoupon[],
}

export interface ISetTotal {
  type: ActionType.SET_TOTAL,
  payload: string,
}

// Action creators - a function returning an action object

export const setSelectedCart = (payload: IObjectForCart): ISetSelectedCart => ({
  type: ActionType.SET_SELECTED_CART,
  payload,
});

export const delFromCart = (payload: IObjectForCart): IDelFromCart => ({
  type: ActionType.DEL_FROM_CART,
  payload,
});

export const setCurrentProducts = (payload: IProduct[]): ISetCurrentProducts => ({
  type: ActionType.SET_CURRENT_PRODUCTS,
  payload,
});

export const setQuantity = (payload: IObjectForCart): ISetQuantity => ({
  type: ActionType.SET_QUANTITY,
  payload,
});

export const setAllProducts = (payload: IProduct[]): ISetAllProducts => ({
  type: ActionType.SET_ALL_PRODUCTS,
  payload,
});

export const setError = (payload: string): ISetError => ({
  type: ActionType.SET_ERROR,
  payload,
});

export const setAllShops = (payload: IShops[]): ISetAllShops => ({
  type: ActionType.SET_ALL_SHOPS,
  payload,
});

export const clearCart = (payload: undefined): IClearCart => ({
  type: ActionType.CLEAR_CART,
  payload,
});

export const setCoupons = (payload: ICoupon[]): ISetCoupons => ({
  type: ActionType.SET_COUPONS,
  payload,
});

export const setTotal = (payload: string): ISetTotal => ({
  type: ActionType.SET_TOTAL,
  payload,
});

