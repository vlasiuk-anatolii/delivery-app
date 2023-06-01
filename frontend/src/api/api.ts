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