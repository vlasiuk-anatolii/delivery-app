import React, { useEffect } from 'react'
import logo from '../../images/svg/logo.svg';
import home from '../../images/svg/home.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons, getError } from '../../store/selectors';
import { Error } from '../../components/Error/Error';
import { setCoupons } from '../../store/actions';
import { CardCoupon } from '../../components/CardCoupon/CardCoupon';
import { currentCoupons } from '../../assets/coupon';

export function CouponsPage() {
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const coupons = useSelector(getCoupons);
  
  useEffect(() => {
    dispatch(setCoupons(currentCoupons));
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