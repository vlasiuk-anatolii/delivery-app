import React from 'react';
import { useSelector } from 'react-redux';

import { Card } from '../Card/Card';
import { getAllShops, getCurrentProducts } from '../../store/selectors';

export const Main: React.FC = () => {
  const shops = useSelector(getAllShops);
  const currentProducts = useSelector(getCurrentProducts);

  function getNameShop(id: number) {
    const nameShop = shops.find(item => item.id === id);
    return nameShop; 
  }
  
  return (
    <div className="bg-white m-4 p-2 rounded-3xl shadow-lg ring-1 ring-gray-900/5">
      <div className="flex bg-white p-6 m-2 rounded-3xl shadow-lg ring-1 ring-gray-900/5">
        <div className="w-10 h-10 mr-2">
          <img 
            src={currentProducts[0] && getNameShop(currentProducts[0].idshop)?.iconurl} 
            alt={currentProducts[0] && getNameShop(currentProducts[0].idshop)?.name} />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">{currentProducts[0] ? getNameShop(currentProducts[0].idshop)?.name : 'Choose a shop!'}</h2> 
      </div>
      <div className="p-2 flex flex-wrap">
      
        {!(currentProducts.length === 0)
          && currentProducts.map(item => {
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
