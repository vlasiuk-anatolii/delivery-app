import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import logo from '../../images/svg/logo.svg';
import cart from '../../images/svg/cart.svg';
import history from '../../images/history.png';
import coupon from '../../images/svg/coupon.svg';

import { Error } from '../Error/Error';
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { NavLink } from 'react-router-dom';
import { IProduct } from '../../react-app-env';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProducts, setAllProducts, setError, setAllShops, clearCart } from '../../store/actions';
import { getSelectedCart, getAllProducts, getAllShops, getError } from '../../store/selectors';
import { getProducts, getShops } from '../../api/api';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedcart = useSelector(getSelectedCart);
  const products = useSelector(getAllProducts);
  const shops = useSelector(getAllShops);
  const error = useSelector(getError);

  function getProductsByShop(id: number) {
    const filteredByShop: IProduct[] = products.filter(item => item.idshop === id);
    dispatch(clearCart(undefined));
    dispatch(setCurrentProducts(filteredByShop));
  }

  useEffect(() => {
    getShops()
      .then(result => {
        dispatch(setAllShops(result));
      })
      .catch((error) => {
        dispatch(setError(`${error}`));
      });
  }, []);

  useEffect(() => {
    getProducts()
      .then(result => {
        dispatch(setAllProducts(result));
      })
      .catch((error) => {
        dispatch(setError(`${error}`));
      });
  }, []);

  return (
    <>
      {error && <Error />}
      <header className="m-4 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
        <nav className="flex max-w-7xl items-center justify-between lg:justify-start p-6" aria-label="Global">

          <div className="flex w-[150px] mr-8">
            <a href="#" className="m-1.5 p-1.5">
              <span className="sr-only">VAM</span>
              <img className="h-8 w-auto" src={logo} alt="logo" />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center flex-1 justify-end rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              <Popover.Button className="flex px-4 items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                Shops
                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {shops.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <img className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" src={item.iconurl} />
                        </div>
                        <div className="flex-auto">
                          <p className="block cursor-pointer font-semibold text-gray-900" onClick={() => getProductsByShop(item.id)}>
                            {item.name}
                            <span className="absolute inset-0" />
                          </p>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <div className="flex flex-1 justify-start">
              <NavLink to="/cart" className="relative p-1.5" title='Go to cart'>
                {selectedcart.length !== 0 &&
                  <div className="absolute right-0 top-0 bg-red-600 w-5 h-5 rounded-full">
                    <p className="text-white text-center leading-none mt-[2px] text-sm">{selectedcart.length}</p>
                  </div>}
                <img className="h-8 w-auto" src={cart} alt="cart" />
              </NavLink>

              <NavLink to="/history" className="relative p-1.5" title='Show history'>
                <img className="h-8 w-auto" src={history} alt="icon-history" />
              </NavLink>

              <NavLink to="/coupons" className="relative p-1.5" title='Show current coupons'>
                <img className="h-8 w-auto" src={coupon} alt="icon-coupon" />
              </NavLink>
            </div>
          </Popover.Group>
        </nav>

        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">VAM</span>
                <img
                  className="h-8 w-auto"
                  src={logo}
                  alt="logo"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {() => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Shops
                          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...shops].map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              onClick={() => getProductsByShop(item.id)}
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <div className="flex flex-1 justify-start">
                    <NavLink to="/cart" className="relative p-1.5" title='Go to cart'>
                      {selectedcart.length !== 0 &&
                        <div className="absolute right-0 top-0 bg-red-600 w-5 h-5 rounded-full">
                          <p className="text-white text-center leading-none mt-[2px] text-sm">{selectedcart.length}</p>
                        </div>}
                      <img className="h-8 w-auto" src={cart} alt="cart" />
                    </NavLink>

                    <NavLink to="/history" className="relative p-1.5" title='Show history'>
                      <img className="h-8 w-auto" src={history} alt="icon-history" />
                    </NavLink>

                    <NavLink to="/coupons" className="relative p-1.5" title='Show current coupons'>
                      <img className="h-8 w-auto" src={coupon} alt="icon-coupon" />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  )
}
