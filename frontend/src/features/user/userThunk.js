import axios from 'axios';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { logoutUser } from './userSlice';
import { getTokenFromLocalStorage } from '../../utils/localStorage';
import { toast } from 'react-toastify';
export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
   
    return { user: resp.data.data.user, token: resp.data.data.token };
  } catch (error) {
    if (error.response) {
      // Jika error.response ada, maka kita bisa mengakses error.message
      console.error('API Error:', error.response.data);
      toast.error(error.response.data.message || 'Something went wrong');
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      console.error('Unexpected Error:', error);
      toast.error('An unexpected error occurred');
      return thunkAPI.rejectWithValue('An unexpected error occurred');
    }}
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    console.log(url);
    console.log(user);
    
    // Melakukan permintaan ke API
    const resp = await customFetch.post(url, user);
    
    // Pastikan respons memiliki struktur yang benar
    console.log(resp); // Cek format respons
    
    return { user: resp.data.data.user, token: resp.data.data.token };
    
  } catch (error) {
   if (error.response) {
      // Jika error.response ada, maka kita bisa mengakses error.message
      console.error('API Error:', error.response.data);
      toast.error(error.response.data.message || 'Something went wrong');
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      console.error('Unexpected Error:', error);
      toast.error('An unexpected error occurred');
      return thunkAPI.rejectWithValue('An unexpected error occurred');
    }
  }
};


export const updateUserThunk = async (url, user, thunkAPI) => {
  const token = getTokenFromLocalStorage();
  try {
    await axios.put(process.env.REACT_APP_AUTH_URL + "/api" + url,
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    let resp1 = ""
    try {
      resp1 = await axios.get(process.env.REACT_APP_AUTH_URL + '/api/user/self', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return { user: resp1.data.data.user, status: 200 }
    } catch (error) {
      if (error.response.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data.data.errors);
      } else {
        return thunkAPI.rejectWithValue(error.response.data.data);
      }
    }
    return { user: resp1.data.data.user };
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};


export const requestPasswordThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.put(url, user);
    return resp.data;
  } catch (error) {
    if (error.response.status === 422) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    } else {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
};

export const setPasswordThunk = async (url, user, thunkAPI) => {
  const token = getTokenFromLocalStorage();
  try {
    const resp = await axios.put(process.env.REACT_APP_AUTH_URL + "/api" + url,
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    return resp.data;
  } catch (error) {
    if (error.response.status === 422) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    } else {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
};

export const resetPasswordTokenThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.put(url + user.token, user.values);
    return resp.data;
  } catch (error) {
    if (error.response.status === 422) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    } else {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};

export const userSelfThunk = async (url, user, thunkAPI) => {
  try {
    const resp1 = await axios.get(process.env.REACT_APP_AUTH_URL + "/api/user/self", {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    return { user: resp1.data.data.user, token: user, };
  } catch (error) {
    if (error.response.status === 422) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    } else {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
};

export const cekTutorThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    if (error.response.status === 422) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    } else {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
};