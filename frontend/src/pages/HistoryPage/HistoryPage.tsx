import React, { useEffect, useState } from 'react'
import logo from '../../images/svg/logo.svg';
import home from '../../images/svg/home.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getError } from '../../store/selectors';
import { Error } from '../../components/Error/Error';
import { IDoneOrders, IObjectForCart } from '../../react-app-env';
import { getOrders } from '../../api/api';
import { setError } from '../../store/actions';
import { CardOrder } from '../../components/CardOrder/CardOrder';

export function HistoryPage() {
  const dispatch = useDispatch();
  const [ordersProducts, setOrdersProducts] = useState<IDoneOrders[]>([]);
  const error = useSelector(getError);

  useEffect(() => {
    getOrders()
      .then(result => {
        setOrdersProducts(result);
      })
      .catch((error) => {
        dispatch(setError(`${error}`));
      });
  }, []);

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
        
          {ordersProducts.length === 0
            ? <p className="p-6"> No orders!</p>
            : ordersProducts.map((item, index) => {
              return (
                <div key={item.id} className="p-6 m-4 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="text-xl w-8 h-8 bg-black rounded-full  font-bold text-white text-center align mb-2">{index + 1}</div>
                  <p className="text-xl font-semibold text-gray-600 mb-3"><span className="text-base ring-1 ring-gray-900/5 rounded-3xl p-1.5 border-2">Order ID:</span> {item.id}</p>
                  <p className="text-xl font-semibold text-gray-600 mb-3"><span className="text-base ring-1 ring-gray-900/5 rounded-3xl p-1.5 border-2">Email:</span> {item.email}</p>
                  <p className="text-xl font-semibold text-gray-600 mb-3"><span className="text-base ring-1 ring-gray-900/5 rounded-3xl p-1.5 border-2">Address:</span> {item.address}</p>
                  <p className="text-xl font-semibold text-gray-600 mb-3"><span className="text-base ring-1 ring-gray-900/5 rounded-3xl p-1.5 border-2">When:</span> {item.createdAt}</p>
                  <p className="text-xl font-semibold text-gray-600 mb-3"><span className="text-base ring-1 ring-gray-900/5 rounded-3xl p-1.5 border-2">Amount:</span> {item.total} $</p>
                  <p className="text-xl font-semibold text-gray-600 mb-3"><span className="text-base ring-1 ring-gray-900/5 rounded-3xl p-1.5 border-2">Products:</span> {
                    JSON.parse(item.order).map((item: IObjectForCart) => {
                      return (
                      <CardOrder
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
                  </p>
                </div>
              )
            })}
        
      </div>
    </>
  )
}