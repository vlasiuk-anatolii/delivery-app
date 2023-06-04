import { IOrder } from './../react-app-env';

export const BASE_URL = 'http://localhost:5000';

export async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);

    return await response.json();
  } catch (error) {
    return error;
  }
}

export async function getShops() {
  try {
    const response = await fetch(`${BASE_URL}/shops`);

    return await response.json();
  } catch (error) {
    return error;
  }
}

 export async function postOrder(data: IOrder) {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const responseData = await response.json();
    // Опрацювання відповіді сервера
    console.log(responseData);
  } catch (error) {
    // Обробка помилки
    console.error(error);
  }
}
