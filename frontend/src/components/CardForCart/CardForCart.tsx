import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuantity } from '../../store/actions';
import { getAllShops } from '../../store/selectors';

type Props = {
  id: number,
  idshop: number,
  name: string,
  price: number,
  discount: number,
  imageurl: string,
  quantity: number,
};

export const CardForCart: React.FC<Props> = ({
  id,
  idshop,
  name,
  price,
  discount,
  imageurl,
  quantity,
}) => {
  const dispatch = useDispatch();
  const shops = useSelector(getAllShops);
  const currentProduct = {
    id,
    idshop,
    name,
    price,
    discount,
    imageurl,
    quantity,
  }

  function getNameShop(id: number) {
    const nameShop = shops.find(item => item.id === id);
    return nameShop?.name; 
  }

  function changeQuantity(quantity: number) {
    currentProduct.quantity = quantity;
    dispatch(setQuantity(currentProduct));
  }

  function getPreviousPrice(dicount: number, price: number) {
    const previousPrice = price /(1 - dicount * 0.01);
    return previousPrice.toFixed(2);
  }

  return (
    <div className="m-2 rounded-3xl ring-1 ring-gray-200">
      <div className="p-2 flex flex-wrap justify-center gap-2">
             
        <div className="w-[200px] h-[200px] mb-2 lg:w-[400px] lg:h-[400px]">
          <img className="w-full h-full rounded-3xl object-cover" src={imageurl} alt={name} />
        </div>
               
        <div className="rounded-2xl bg-gray-50 p-6 text-center ring-1 ring-inset ring-gray-900/5">
          <div className="mx-auto max-w-xs p-2">
            <p className="text-xl font-semibold text-gray-600 mb-2"><span className="text-base">Name:</span> {name}</p>
            <p className="text-xl font-semibold text-gray-600 mb-2"><span className="text-base">Shop:</span> {getNameShop(idshop)}</p>
            <p className="mt-4 flex items-baseline justify-center gap-x-2">
              <span className="text-base">Price:</span>
              <span className="text-5xl font-bold tracking-tight text-gray-900">${price}</span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
            </p>

            <p className="mt-4 mb-4 flex items-baseline justify-center gap-x-2">
              <span className="text-base">Previous price:</span>
              <span className="text-4xl tracking-tight line-through text-gray-400">${getPreviousPrice(discount, price)}</span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
            </p>

            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              </label>
              <div className="mt-2.5">
                <input
                  type="number"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  value={quantity}
                  onChange={(event) => {
                    if (+event.target.value >= 1) {
                      changeQuantity(+event.target.value);
                    }
                  }}
                  className="block text-sm w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
