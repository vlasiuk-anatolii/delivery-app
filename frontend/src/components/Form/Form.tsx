import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedCart } from '../../store/selectors';
import { IOrder } from '../../react-app-env';
import { postOrder } from '../../api/api';
import { v4 as uuidv4 } from 'uuid';
import ReCAPTCHA from 'react-google-recaptcha';
import { setError } from '../../store/actions';
const SITE_KEY = '6LcTuKMjAAAAAH99EHMwIJg8G-gtMvEXW29BQffk';

interface FormValues {
  name: string,
  address: string,
  email: string,
  phone: string,
}

interface Props {
  address: string,
  totalValue: string,
}

export const Form: React.FC<Props> = ({ address, totalValue }) => {
  const [isRecaptchaVerified, setRecaptchaVerified] = useState(false);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    address: address,
    email: '',
    phone: '',
  });

  const currentProductsInCart = useSelector(getSelectedCart);
  const dispatch = useDispatch();

  const handleRecaptchaChange = (response: string | null) => {
    if (response) {
      setRecaptchaVerified(true);
    }
  };

  const validateForm = () => {
    const { name, address, email, phone } = formValues;
    const errors: Partial<FormValues> = {};

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!address) {
      errors.address = 'Address is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email address';
    }

    if (!phone) {
      errors.phone = 'Phone number is required';
    } else if (!isValidPhone(phone)) {
      errors.phone = 'Invalid phone number';
    }
    setErrors(errors);

    return Object.keys(errors).length === 0; // Повертає true, якщо форма валідна
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isRecaptchaVerified) {
      if (validateForm()) {
        setSubmitted(true);
  
        const objToSend: IOrder = {
          ...formValues,
          total: totalValue,
          order: currentProductsInCart,
          id: uuidv4(),
        }
         
        postOrder(objToSend);
  
        setFormValues({
          name: '',
          address: '',
          email: '',
          phone: '',
        });
        setErrors({});
      }
      dispatch(setError(''));
    } else {
      dispatch(setError('Please verify reCAPTCHA'));
    }
  };

  useEffect(() => {
    setFormValues({ ...formValues, address })
  }, [address]);

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-4 max-w-xl">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 mb-8">

        <div>
          <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
            Name
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              value={formValues.name}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.name && <p className="text-red-600 font-bold">{errors.name}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-900">
            Address
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="address"
              id="address"
              autoComplete="address"
              value={address}
              readOnly
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.address && <p className="text-red-600 font-bold">{errors.address}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
            Email
          </label>
          <div className="mt-2.5">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              value={formValues.email}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.email && <p className="text-red-600 font-bold">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
            Phone number
          </label>
          <div className="mt-2.5">
            <input
              type="tel"
              name="phone"
              id="phone-number"
              autoComplete="tel"
              value={formValues.phone}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.phone && <p className="text-red-600 font-bold">{errors.phone}</p>}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 my-4 rounded-3xl shadow-lg ring-1 ring-gray-900/5">
        <div className="flex items-center">
          <ReCAPTCHA
            onChange={handleRecaptchaChange}
            sitekey={SITE_KEY}
          />
        </div>
      </div>

      {submitted && <p className="text-green-600 font-bold">Form successfully submitted!</p>}

      <div className="mt-10 flex gap-4">
        <p className="mt-4 flex items-baseline justify-center gap-x-2">
          <span className="text-base">Total:</span>
          <span className="text-5xl font-bold tracking-tight text-gray-900">${totalValue}</span>
          <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
        </p>
        {isRecaptchaVerified && <button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>}
      </div>
    </form>
  )
}
