import { IObjectForCart, IProduct, IShops  } from '../react-app-env';

// Action types - is just a constant. MUST have a unique value.
export enum ActionType {
  SET_SELECTED_CART = 'SET_SELECTED_CART',
  DEL_FROM_CART = 'DEL_FROM_CART',
  SET_CURRENT_PRODUCTS = 'SET_CURRENT_PRODUCTS',
  SET_QUANTITY = 'SET_QUANTITY',
  SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS',
  SET_ERROR = 'SET_ERROR',
  SET_ALL_SHOPS = 'SET_ALL_SHOPS',
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

