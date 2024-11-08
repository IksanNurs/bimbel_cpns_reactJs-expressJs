import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';

import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

const initialState = {
  isLoading: false,
  he: 0,
  wi: 0,
  act: false,
  act1: false,
  servicePurchase: 0, //0=all package, 1= belajar mandiri, 2= kelas intensif
  serviceAvailable: 2, //0=all package, 1= belajar mandiri, 2= kelas intensif
  type_product: 0,
  head:false,
};

export const getBundleServicePurchased = async (url) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data.data;
  } catch (error) {
    return error.response.data.data
  }
}

export const getBundleAvailable = async (url) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data.data;
  } catch (error) {
    return error.response.data.data
  }
}


export const getServiceAvailable = async (url) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data.data;
  } catch (error) {
    return error.response.data.data
  }
}



const packagedSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      state.isLogout = true;
      state.isLogin = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
    setLogout: (state, { payload }) => {
      ////console.log(payload)
      return { ...state, ...payload };
    },
    setRequest: (state, { payload }) => {
      ////console.log(payload);
      return { ...state, ...payload };
    },
  },

});

export const { toggleSidebar, logoutUser, setLogout, setRequest } = packagedSlice.actions;
export default packagedSlice.reducer;
