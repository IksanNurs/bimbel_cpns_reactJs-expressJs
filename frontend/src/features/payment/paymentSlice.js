import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { paymentPostThunk, refreshStatusThunk } from './paymentThunk';

const initialState = {
  isLoading1: false,
  isLoading2: false
};


export const getPayments = async () => {
  try {
    const resp = await customFetch.get("/orders");
    return resp.data.data;
  } catch (error) {
    return error.response.data.data
  }
}

export const cancelOrder = createAsyncThunk(
  "payment/cancelOrder",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.put("/midtrans/cancel/" + data);
      return { data: resp.data.data, status: 200 };
    } catch (error) {
      if (error.response.status === 401) {
        return checkForUnauthorizedResponse(error, thunkAPI);
      } else {
        return thunkAPI.rejectWithValue(error.response.data.data);
      }
    }
  }
);

export const checkStatusMidtrans = createAsyncThunk(
  "payment/checkStatusMidtrans",
  async (data, thunkAPI) => {
    try {
      const resp = await customFetch.get("/midtrans/status?id=" + data);
      return { data: resp.data.data, status: 200 };
    } catch (error) {
      toast.info("Saat ini belum ada perubahan status");
      if (error.response.status === 401) {
        return checkForUnauthorizedResponse(error, thunkAPI);
      } else {
        return thunkAPI.rejectWithValue(error.response.data.data);
      }
    }
  }
);

export const getPaymentById = createAsyncThunk(
  "payment/getPaymentById",
  async (uuid, thunkAPI) => {
    try {
      const resp = await customFetch.get("/order/" + uuid);
      return resp.data.data;
    } catch (error) {
      return error.response.data.data
    };
  }
);

export const postPayment = createAsyncThunk(
  "payment/postPayment",
  async (event, thunkAPI) => {
    return paymentPostThunk('/orders', event, thunkAPI)
  }
);






const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setState: (state, { payload }) => {
      ////console.log(payload);
      return { ...state, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postPayment.rejected, (state, { payload }) => {
        toast.error(payload);
      })
   
  },

});

export const { setState } = paymentSlice.actions;
export default paymentSlice.reducer;
