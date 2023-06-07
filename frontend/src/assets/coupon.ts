import { ICoupon } from '../react-app-env';
import { v4 as uuidv4 } from 'uuid';

export const currentCoupons: ICoupon[] = [
  {
    id: '1',
    name: 'Save 50%',
    discount: 0.5,
    code: uuidv4(),
    stateUsing: 'unused',
    imgUrl: 'images/coupons/50.png',
  },
  {
    id: '2',
    name: 'Save 40%',
    discount: 0.4,
    code: uuidv4(),
    stateUsing: 'unused',
    imgUrl: 'images/coupons/40.png',
  },
  {
    id: '3',
    name: 'Save 30%',
    discount: 0.3,
    code: uuidv4(),
    stateUsing: 'unused',
    imgUrl: 'images/coupons/30.png',
  }
]