import axios from 'axios';
import { IOrder } from './../react-app-env';

export const BASE_URL = 'http://localhost:5000';

export async function getProducts() {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function getShops() {
  try {
    const response = await axios.get(`${BASE_URL}/shops`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function postOrder(data: IOrder) {
  try {
    console.log('object to send', JSON.stringify(data));
    const response = await axios.post(`${BASE_URL}/orders`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function getOrders() {
  try {
    const response = await axios.get(`${BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    return error;
  }
}
