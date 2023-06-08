import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getError } from '../../store/selectors';

export const Error = () => {
  const [isVisible, setIsVisible] = useState(true);
  const error = useSelector(getError);

  return (
    <>
      {isVisible &&
        <div className="sticky bg-white m-4 rounded-3xl shadow-lg ring-1 ring-gray-900/5">
          <p className="flex justify-between cursor-pointer p-6 bg-red-500 rounded-3xl text-white"> {error}<div onClick={() => setIsVisible(false)}>&times;</div></p>
        </div>
      }
    </>
  )
}
