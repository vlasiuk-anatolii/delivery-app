import React, { useState } from 'react';
import { setError } from '../../store/actions';

type Props = {
  id: string,
  name: string,
  discount: number,
  code: string,
  stateUsing: string,
  imgUrl: string,
};

export const CardCoupon: React.FC<Props> = ({
  id,
  name,
  discount,
  code,
  stateUsing,
  imgUrl,
}) => {
  
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {
        setError(`Error copying to clipboard: ${error}`);
      });
  };

  return (
    <div className="m-2 rounded-3xl ring-1 ring-gray-200">
      <div className="p-2 flex flex-wrap justify-center gap-2">

        <div className="flex mb-2 lg:w-[400px] lg:h-[260px]">
          <img className="rounded-3xl" src={imgUrl} alt={name} />
        </div>

        <div className="rounded-2xl bg-gray-50 p-3 text-center ring-1 ring-inset ring-gray-900/5">
          <div className="mx-auto max-w-xs p-2">
            <p className="text-xl font-semibold text-gray-600 mb-1"><span className="text-base">Name:</span> {name}</p>
            <p className="text-xl font-semibold text-gray-600 mb-1"><span className="text-base">ID:</span> {id}</p>
            <p className="text-xl font-semibold text-gray-600 mb-1"><span className="text-base">State:</span> {stateUsing}</p>
            <p className="text-xl font-semibold text-gray-600 mb-1"><span className="text-base">Save:</span> {`${discount * 100} %`}</p>
            <p className="text-xl font-semibold text-gray-600 mb-1"><span className="text-base">Code:</span> {`${code.slice(0, 6)}...`}</p>
          </div>

          { stateUsing === 'unused' && <button
            type="button"
            onClick={handleCopyClick}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isCopied ? 'Copied!' : 'Copy to Clipboard'}
          </button>}
        </div>
      </div>
    </div>
  )
}
