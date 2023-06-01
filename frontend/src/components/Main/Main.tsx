import React from 'react';
import { useSelector } from 'react-redux';

import { Card } from '../Card/Card';
import { getCurrentProducts, getError } from '../../store/selectors';

export const Main: React.FC = () => {

  const currentProducts = useSelector(getCurrentProducts);
  const error = useSelector(getError);
  return (
    <div className="bg-white m-4 rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
      <div className="p-2 flex flex-wrap">
      {error && <p className="p-6 bg-red-500 rounded-3xl text-white"> {error}</p>}
        {currentProducts.length === 0
          ? <p className="p-6"> Choose a shop!</p>
          : currentProducts.map(item => {
            return (
              <Card
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                imageurl={item.imageurl} 
                idshop={item.idshop} 
                discount={item.discount} />
            )
          })}
      </div>
    </div>
  );
};
