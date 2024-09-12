import constant from '@/common/constant.js';
import { axiosInstance, toastError } from '@/common/utils.js';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const userLogin = createAsyncThunk('user/login', async (body: any) => {
  const { data } = await axiosInstance.post('/user/login', body);
  return data;
});
export const userLogout = createAsyncThunk('user/logout', async () => {
  const { data } = await axiosInstance.post('/user/logout');
  return data;
});

const initialState = {
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userLogin.pending, () => {
        return initialState;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        localStorage.setItem(constant.token, payload.data.token);
        state.isLoggedIn = true;
        window.location.replace('/');
      })
      .addCase(userLogin.rejected, () => {
        toastError('Something went wrong');
        return initialState;
      })
      .addCase(userLogout.pending, state => {
        return state;
      })
      .addCase(userLogout.fulfilled, state => {
        localStorage.removeItem(constant.token);
        state.isLoggedIn = false;
        window.location.replace('/login');
      })
      .addCase(userLogout.rejected, () => {
        toastError('Something went wrong');
        return initialState;
      });
  },
});

export default userSlice.reducer;
