import React, { useEffect, useState } from 'react'
import logo from '../../images/svg/logo.svg';
import { CardForCart } from '../../components/CardForCart/CardForCart';
import { useSelector } from 'react-redux';
import { getSelectedCart, getAllShops } from '../../store/selectors';
import { IObjectForCart } from '../../react-app-env';
import { Loader } from '@googlemaps/js-api-loader';
const API_MAP_KEY = 'AIzaSyAFIWQywSEpFuQrzrCnsDKQbhPLcvt4ANU';

export function CartPage() {
  const shops = useSelector(getAllShops);
  
  const initializeMap = (
    lat = 50.451486243956545, 
    lng = 30.523249991641517, 
    place: string
    ) => {
    const loader = new Loader({
      apiKey: `${API_MAP_KEY}`,
      version: 'weekly',
    });
  
    loader.load().then(() => {
      
      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: { lat, lng },
          zoom: 18,
        }
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: `${place}`,
      });
    });
  };

  const currentProductsInCart = useSelector(getSelectedCart);
  let productsForRender: IObjectForCart[] = [];
  const [totalValue, setTotalValue] = useState('0');

  if (currentProductsInCart.length) {
    productsForRender = currentProductsInCart.sort((a, b) => a.id - b.id);
  }

  function getTotalValue() {
    const totalValue = currentProductsInCart.reduce((a, x) => a + x.price * x.quantity, 0);
    return totalValue.toFixed(2); 
  }

  useEffect(() => {
    setTotalValue(getTotalValue());
  }, [currentProductsInCart]);

  useEffect(() => {
    const currentShop = shops.find(item => item.id === currentProductsInCart[0].idshop);
    if (currentShop) {
      initializeMap(+(currentShop.lat), +(currentShop.lng), currentShop.name);
    }
  }, [currentProductsInCart]);

  return (
    <>
      <div className="bg-white p-6 m-4 rounded-3xl shadow-lg ring-1 ring-gray-900/5">
        <a href="#" className="m-1.5 p-1.5">
          <span className="sr-only">VAM</span>
          <img className="h-8 w-auto" src={logo} alt="logo" />
        </a>
      </div>

      <div className="flex flex-wrap justify-center p-6 m-4 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
        <div className="p-6 m-4 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
          {productsForRender.length === 0
            ? <p className="p-6"> Cart is empty!</p>
            : productsForRender.map(item => {
              return (
                <CardForCart
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  imageurl={item.imageurl}
                  idshop={item.idshop}
                  discount={item.discount}
                  quantity={item.quantity}
                />
              )
            })}
        </div>

        <div className="bg-white p-6 m-4 rounded-3xl shadow-lg ring-1 ring-gray-900/5">
          <div id="map" className="w-full h-[400px] rounded-3xl">
            {/* <img className="rounded-3xl mb-2 object-cover" src="http://via.placeholder.com/640x640" alt="" /> */}
          </div>
          
          <p className="mt-4 flex items-baseline justify-center gap-x-2">
            <span className="text-base">Total:</span>
            <span className="text-5xl font-bold tracking-tight text-gray-900">${totalValue}</span>
            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
          </p>

          <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

              <div>
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                  Phone number
                </label>
                <div className="mt-2.5">
                  <input
                    type="tel"
                    name="phone-number"
                    id="phone-number"
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}