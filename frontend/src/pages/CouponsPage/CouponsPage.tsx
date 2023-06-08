import React, { useEffect } from 'react'
import logo from '../../images/svg/logo.svg';
import home from '../../images/svg/home.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons, getError, getSelectedCart } from '../../store/selectors';
import { Error } from '../../components/Error/Error';
import { setCoupons } from '../../store/actions';
import { CardCoupon } from '../../components/CardCoupon/CardCoupon';
import { currentCoupons } from '../../assets/coupon';
import { NavLink } from 'react-router-dom';
import cart from '../../images/svg/cart.svg';
import { APP_KEYS } from '../../consts';

export function CouponsPage() {
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const coupons = useSelector(getCoupons);
  const selectedcart = useSelector(getSelectedCart);

  useEffect(() => {
    dispatch(setCoupons(currentCoupons));
  }, []);

  return (
    <>
      {error && <Error />}
      <div className="flex bg-white p-6 m-4 rounded-3xl shadow-lg ring-1 ring-gray-900/5">
        <a href="#" className="flex">
          <span className="sr-only">VAM</span>
          <img className="h-8 w-auto mr-3" src={logo} alt="logo" />
          <img className="h-8 w-auto mr-3" src={home} alt="home" title="Back to home" />
        </a>

        <NavLink to={APP_KEYS.ROUTER_KEYS.CART_PAGE} className="relative p-0.5" title='Go to cart'>
          {selectedcart.length !== 0 &&
            <div className="absolute right-0 top-0 bg-red-600 w-5 h-5 rounded-full">
              <p className="text-white text-center leading-none mt-[2px] text-sm">{selectedcart.length}</p>
            </div>}
          <img className="h-8 w-auto" src={cart} alt="cart" />
        </NavLink>
      </div>

      <div className="flex flex-wrap justify-center p-6 m-4 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">

        {coupons.length === 0
          ? <p className="p-6"> No coupons!</p>
          : coupons.map((item) => {
            return (
              <div key={item.id} className="p-6 m-4 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="text-xl w-8 h-8 bg-black rounded-full  font-bold text-white text-center align mb-2">{item.id}</div>
                <CardCoupon
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  discount={item.discount}
                  code={item.code}
                  stateUsing={item.stateUsing}
                  imgUrl={item.imgUrl}
                />
              </div>
            )
          })}
      </div >
    </>
  )
}