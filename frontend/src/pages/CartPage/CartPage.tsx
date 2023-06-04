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
import { setError } from '../../store/actions';
import { Form } from '../../components/Form/Form';

export function CartPage() {
  const currentProductsInCart = useSelector(getSelectedCart);
  let productsForRender: IObjectForCart[] = [];
  const shops = useSelector(getAllShops);
  const error = useSelector(getError);
  const [totalValue, setTotalValue] = useState('0');
  const [getRoute, setGetRoute] = useState(false);
  const [distanse, setDistance] = useState(0);
  const [timeDelivery, setTimeDelivery] = useState(0);
  const [newLat, setNewLat] = useState(0);
  const [newLng, setNewLng] = useState(0);
  const [address, setAddress] = useState('');

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
        draggable: true,
      });

      marker.addListener('dragend', function () {
        const newPosition = marker.getPosition();
        if (newPosition) {
          setNewLat(newPosition.lat());
          setNewLng(newPosition.lng());
          console.log('Вибрані координати:', newPosition.lat(), newPosition.lng());

          const geocoder = new google.maps.Geocoder();  // Виклик сервісу геокодування для отримання адреси
          geocoder.geocode({ 'location': newPosition }, function (results, status) {
            if (status === 'OK') {
              if (results && results.length > 0) {
                setAddress(results[0].formatted_address); // 'Отримана адреса:', results[0].formatted_address

              } else {
                setError('Address not found');
              }
            } else {
              setError(`Geocoding error: ${status}`);
            }
          });
        } else {
          setError('Error getting coordinates');
        }
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentLocation = {
              lat: newLat || position.coords.latitude,
              lng: newLng || position.coords.longitude,
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
                        setError('Route distance is not available.');
                      }
                    } else {
                      setError('Route not found.');
                    }
                  } else {
                    setError(`The route could not be found. Error: ${status}`);
                  }
                }
              );
            }
          },
          (error) => {
            setError(`Error getting current location: ${error}`);
          }
        );
      } else {
        setError('Geolocation is not supported by the browser.');
      }
    });
  };

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
    if (currentProductsInCart.length) {
      const currentShop = shops.find(item => item.id === currentProductsInCart[0].idshop);
      if (currentShop) {
        initializeMap(+(currentShop.lat), +(currentShop.lng), currentShop.name);
      }
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
                  onChange={() => { setGetRoute(!getRoute) }}
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

          <Form          
            address={address}
            totalValue={totalValue}
             />
        </div>
      </div>
    </>
  )
}