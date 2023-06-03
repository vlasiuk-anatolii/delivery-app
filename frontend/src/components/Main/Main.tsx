import React from 'react';
import { useSelector } from 'react-redux';

import { Card } from '../Card/Card';
import { getCurrentProducts } from '../../store/selectors';

export const Main: React.FC = () => {

  const currentProducts = useSelector(getCurrentProducts);
  
  return (
    <div className="bg-white m-4 rounded-3xl shadow-lg ring-1 ring-gray-900/5">
      <div className="p-2 flex flex-wrap">
      
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
