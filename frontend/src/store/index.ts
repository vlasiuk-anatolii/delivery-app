import { legacy_createStore as createStore } from 'redux';
import { IRootState } from '../react-app-env';
import {
  ISetSelectedCart,
  ActionType,
  IDelFromCart,
  ISetCurrentProducts,
  ISetQuantity,
  ISetAllProducts,
  ISetError,
  ISetAllShops,
  IClearCart,
  ISetCoupons,
  ISetTotal,
} from './actions';

// Initial state
const initialState: IRootState = {
  selectedcart: [],
  currentProducts: [],
  allProducts: [],
  allShops: [],
  error: '',
  coupons: [],
  currentTotal: '',
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (
  state = initialState,
  action:
    ISetSelectedCart 
    | IDelFromCart 
    | ISetCurrentProducts 
    | ISetQuantity 
    | ISetAllProducts 
    | ISetError 
    | ISetAllShops 
    | IClearCart
    | ISetCoupons
    | ISetTotal
) => {
  switch (action.type) {
    case ActionType.SET_SELECTED_CART:
      return {
        ...state,
        selectedcart: [...state.selectedcart, action.payload],
      };

    case ActionType.DEL_FROM_CART:
      return {
        ...state,
        selectedcart: state.selectedcart
          .filter(item => item.id !== action.payload.id),
      };

    case ActionType.SET_CURRENT_PRODUCTS:
      return {
        ...state,
        currentProducts: action.payload,
      };

    case ActionType.SET_QUANTITY:
      return {
        ...state,
        selectedcart: [...state.selectedcart
          .filter(item => item.id !== action.payload.id), action.payload],
      };

    case ActionType.SET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: [...action.payload],
      };

    case ActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ActionType.SET_ALL_SHOPS:
      return {
        ...state,
        allShops: [...action.payload],
      };

    case ActionType.CLEAR_CART:
      return {
        ...state,
        selectedcart: [],
      };

    case ActionType.SET_COUPONS:
      return {
        ...state,
        coupons: [...action.payload],
      };

    case ActionType.SET_TOTAL:
      return {
        ...state,
        currentTotal: action.payload,
      };

    default:
      return state;
  }
};

export const store = createStore(
  rootReducer,
);

export default store;
