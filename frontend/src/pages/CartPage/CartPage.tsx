import React, { useEffect, useState } from 'react'
import logo from '../../images/svg/logo.svg';
import home from '../../images/svg/home.svg';
import { CardForCart } from '../../components/CardForCart/CardForCart';
import { useSelector } from 'react-redux';
import { getSelectedCart, getAllShops, getError } from '../../store/selectors';
import { IObjectForCart } from '../../react-app-env';
import { Loader } from '@googlemaps/js-api-loader';
import { APP_KEYS } from '../../consts';
import { Error } from '../../components/Error/Error';

export function CartPage() {
  const shops = useSelector(getAllShops);
  const error = useSelector(getError);

  const initializeMap = (
    lat = APP_KEYS.GOOGLE_MAP.INITIAL_LAT,
    lng = APP_KEYS.GOOGLE_MAP.INITIAL_LNG,
    place = APP_KEYS.GOOGLE_MAP.INITIAL_PLACE,
  ) => {
    const loader = new Loader({
      apiKey: `${APP_KEYS.GOOGLE_MAP.API_KEY}`,
      version: 'weekly',
      libraries: ['geometry', 'places'],
    });

    loader.load().then(() => {

      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: { lat, lng },
          zoom: APP_KEYS.GOOGLE_MAP.INITIAL_ZOOM,
        }
      );

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: `${place}`,
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            const directionsRequest = {
              origin: currentLocation,
              destination: { lat, lng },
              travelMode: google.maps.TravelMode.DRIVING,
            };

            if (getRoute) {
              directionsService.route(
                directionsRequest,
                (response, status) => {
                  if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(response);
  
                    if (response && response.routes && response.routes.length > 0) {
                      const route = response.routes[0];
                      let distance = 0;
  
                      for (let i = 0; i < route.legs.length; i++) {
                        const leg = route.legs[i];
                        if (leg.distance && leg.distance.value) {
                          distance += leg.distance.value;
                        }
                      }
  
                      if (distance > 0) {
                        setDistance(distance / 1000);
                        setTimeDelivery((distance / 1000) / APP_KEYS.GOOGLE_MAP.INITIAL_SPEED)
                      } else {
                        console.log('Дистанція маршруту недоступна.');
                      }
                    } else {
                      console.error('Маршрут не знайдено.');
                    }
                  } else {
                    console.error('Не вдалося знайти маршрут. Помилка: ', status);
                  }
                }
              );
            }
          },
          (error) => {
            console.error('Помилка отримання поточного місцезнаходження: ', error);
          }
        );
      } else {
        console.error('Геолокація не підтримується браузером.');
      }
    });
  };

  const currentProductsInCart = useSelector(getSelectedCart);
  let productsForRender: IObjectForCart[] = [];
  const [totalValue, setTotalValue] = useState('0');
  const [getRoute, setGetRote] = useState(false);
  const [distanse, setDistance] = useState(0);
  const [timeDelivery, setTimeDelivery] = useState(0);

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
  }, [currentProductsInCart, getRoute]);

  return (
    <>
      {error && <Error />}
      <div className="bg-white p-6 m-4 rounded-3xl shadow-lg ring-1 ring-gray-900/5">
        <a href="#" className=" flex m-1.5 p-1.5">
          <span className="sr-only">VAM</span>
          <img className="h-8 w-auto mr-3" src={logo} alt="logo" />
          <img className="h-8 w-auto" src={home} alt="home" title="Back to home" />
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
          <div id="map" className="w-full h-[400px] rounded-3xl shadow-lg">
          </div>

          <div className="bg-white p-6 mt-4 rounded-3xl shadow-lg ring-1 ring-gray-900/5">
            
            <div className="flex items-center">
              <label htmlFor="get-route" className="text-sm font-semibold leading-6 mr-4 text-gray-900 align-end ">
                Get route
              </label>
              <div className="my-4">
                <input
                  type="checkbox"
                  name="get-route"
                  id="get-route"
                  checked={getRoute}
                  onChange={() => {setGetRote(!getRoute)}}
                />
              </div>
            </div>

            {getRoute && <>
              <div className="flex items-center">
                <h2 className="mr-2">Distance: </h2>
                <p>{distanse} km</p>
              </div>
  
              <div className="flex items-center">
                <h2 className="mr-2">Delivery time: </h2>
                <p>{timeDelivery.toFixed(2)} h</p>
              </div>
            </>}
          </div>

          <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

              <div>
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-900">
                  Address
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    autoComplete="address"
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

            <div className="mt-10 flex gap-4">
              <p className="mt-4 flex items-baseline justify-center gap-x-2">
                <span className="text-base">Total:</span>
                <span className="text-5xl font-bold tracking-tight text-gray-900">${totalValue}</span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
              </p>
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