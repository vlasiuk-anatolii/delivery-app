import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons, getCurrentTotal, getSelectedCart } from '../../store/selectors';
import { NavLink, useNavigate } from 'react-router-dom';
import { IOrder } from '../../react-app-env';
import { postOrder } from '../../api/api';
import { v4 as uuidv4 } from 'uuid';
import ReCAPTCHA from 'react-google-recaptcha';
import { APP_KEYS } from '../../consts';
import { clearCart, setCoupons, setError, setTotal } from '../../store/actions';
import coupon from '../../images/svg/coupon.svg';

interface FormValues {
  name: string,
  address: string,
  email: string,
  phone: string,
}

interface Props {
  address: string,
}

export const Form: React.FC<Props> = ({ address }) => {
  const totalValue = useSelector(getCurrentTotal);
  const [isRecaptchaVerified, setRecaptchaVerified] = useState(false);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isCodeApplied, setIsCodeAplied] = useState(false);
  const [couponCode, setCouponeCode] = useState('');
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    address: address,
    email: '',
    phone: '',
  });

  const currentProductsInCart = useSelector(getSelectedCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coupons = useSelector(getCoupons);

  const handleRecaptchaChange = (response: string | null) => {
    if (response) {
      setRecaptchaVerified(true);
    }
  };

  const validateForm = () => {
    const { name, address, email, phone } = formValues;
    const errors: Partial<FormValues> = {};

    if (!address) {
      errors.address = 'Address is required';
    }

    if (!name) {
      errors.name = 'Name is required';
    } else if (!isValidName(name)) {
      errors.name = 'Invalid name address';
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

    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const isValidName = (name: string) => {
    const nameRegex = /^[a-zA-Z0-9]+$/;
    return nameRegex.test(name);
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

  const handleCouponeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCouponeCode(value);
  };

  const handleApplingCode = () => {
    const isExistCoupon = coupons.find(item => item.code === couponCode);
    if (isExistCoupon) {
      const newTotalValue = (+totalValue * (1 - isExistCoupon.discount)).toFixed(2);
      setIsCodeAplied(true);
      dispatch(setTotal(newTotalValue));
      isExistCoupon.stateUsing = 'used';
      dispatch(setCoupons([...coupons, isExistCoupon]));
    } else {
      setIsCodeAplied(false);
    }
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
        dispatch(clearCart(undefined));
        dispatch(setError(''));
        setTimeout(() => {
          navigate('/');
        }, 5000)

      } else {
        dispatch(setError('You should fill the form'));
      }
    } else {
      dispatch(setError('Please verify reCAPTCHA'));
    }
  };

  useEffect(() => {
    setFormValues({ ...formValues, address });
  }, [address, totalValue]);

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
              placeholder="Name"
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
              title="Move the red marker to your location"
              type="text"
              name="address"
              id="address"
              autoComplete="address"
              placeholder="Kyiv, Ukraine, 02000"
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
              placeholder="example@email.com"
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
              placeholder="0993202222"
              value={formValues.phone}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.phone && <p className="text-red-600 font-bold">{errors.phone}</p>}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 my-4 rounded-3xl shadow-lg ring-1 ring-gray-900/5">
        <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
          Coupon code:
        </label>
        <div className="my-2.5">
          <input
            type="text"
            name="coupon"
            id="coupon"
            value={couponCode}
            onChange={handleCouponeCode}
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

        </div>
        <div className='flex'>
          <button
            type="button"
            disabled={isCodeApplied}
            onClick={handleApplingCode}
            className={`block w-full rounded-md mr-2 ${isCodeApplied ? 'bg-gray-400' : 'bg-indigo-600'} px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm ${!isCodeApplied && 'hover:bg-indigo-500'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          >
            {isCodeApplied ? 'Applied!' : 'Apply'}
          </button>
          <NavLink to="/coupons" className="relative" title='Show current coupons'>
            <img className="h-8 w-auto" src={coupon} alt="icon-coupon" />
          </NavLink>
        </div>
      </div>

      <div className="bg-white p-6 my-4 rounded-3xl shadow-lg ring-1 ring-gray-900/5">
        <div className="flex items-center">
          <ReCAPTCHA
            onChange={handleRecaptchaChange}
            sitekey={APP_KEYS.CAPTCHA.SITE_KEY}
          />
        </div>
      </div>

      {submitted && <p className="text-green-600 font-bold">Data successfully were send to DB!</p>}

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
