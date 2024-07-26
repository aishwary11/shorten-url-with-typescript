import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import constant from '../common/constant';
import { axiosInstance, toastError } from '../common/utils';

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
  name: 'User',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userLogin.pending, () => {
        return initialState;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        localStorage.setItem(constant.token, payload.data.token);
        payload.isLoggedIn = true;
        state = payload;
        window.location.replace('/');
        // toastSuccess(payload.msg);
        return state;
      })
      .addCase(userLogin.rejected, () => {
        toastError('Something went wrong');
        return initialState;
      })
      .addCase(userLogout.pending, state => {
        return state;
      })
      .addCase(userLogout.fulfilled, (state, { payload }) => {
        localStorage.removeItem(constant.token);
        payload.isLoggedIn = false;
        state = payload;
        window.location.replace('/login');
        return state;
      })
      .addCase(userLogout.rejected, () => {
        toastError('Something went wrong');
        return initialState;
      });
  },
});

export default userSlice.reducer;
