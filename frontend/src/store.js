import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import packagedSlice from './features/packaged/packagedSlice';
import paymentSlice from './features/payment/paymentSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    package: packagedSlice,
    payment:paymentSlice,
  },
});
