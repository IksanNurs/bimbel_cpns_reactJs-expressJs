import axios from 'axios';
import { clearStore } from '../features/user/userSlice';
import { getTokenFromLocalStorage } from './localStorage';

// const customFetch = axios.create({
//   baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
// });
const customFetch = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

customFetch.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
