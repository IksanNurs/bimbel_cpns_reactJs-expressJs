import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  addIsTutorToLocalStorage,
  addSubmissionToLocalStorage,
  addUserToLocalStorage,
  getIsTutorFromLocalStorage,
  getSubmissionFromLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';
import {
  loginUserThunk,
  registerUserThunk,
  clearStoreThunk,
  userSelfThunk,
  cekTutorThunk,
} from './userThunk';

const initialState = {
  isLoading: false,
  isLogout: false,
  isLogin: false,
  isSidebarOpen: false,
  isSuccesRequestEmail: false,
  user: getUserFromLocalStorage(),
  submission: getSubmissionFromLocalStorage(),
  isChange: false,
  isTutor: getIsTutorFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI);
  }
);


export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    return loginUserThunk('/auth/login', user, thunkAPI);
  }
);



export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);
const userSlice = createSlice({
  name: 'user',
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
        // toast.success(payload);
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
  extraReducers: (builder) => {
    builder
     
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user, token } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user, token);
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
      
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user, token } = payload;
        state.isLoading = false;
        state.isLogin = true;
        state.isLogout = false;
        state.user = user;
        addUserToLocalStorage(user, token);

        toast.success(`Selamat Datang ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
     
      })
      .addCase(clearStore.rejected, () => {
        toast.error("There was an error..");
      })
      
  },
});

export const { toggleSidebar, logoutUser, setLogout, setRequest } = userSlice.actions;
export default userSlice.reducer;
