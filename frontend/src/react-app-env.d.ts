export interface IProduct {
  id: number,
  idshop: number,
  name: string,
  price: number,
  discount: number,
  imageurl: string,
}

export interface IRootState {
  selectedcart: IObjectForCart[],
  currentProducts: IProduct[],
  allProducts: IProduct[],
  error: string,
  allShops: IShops[],
}

export interface IObjectForCart extends IProduct  {
  quantity: number,
}

export interface IShops {
  id: number,
  name: string, 
  description: string, 
  href: string,
  iconurl: string,
  lat: number,
  lng: number, 
}

export interface IOrder {
  id: string,
  name: string, 
  email: string, 
  phone: string,
  address: string,
  order: IObjectForCart[],
  total: string, 
}

export interface IDoneOrders {
  id: string,
  name: string, 
  email: string, 
  phone: string,
  address: string,
  order: string,
  createdAt: string,
  total: string, 
}
