import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import constant from '../common/constant';
import { axiosInstance, toastError, toastSuccess } from '../common/utils';

export const userLogin = createAsyncThunk('user/login', async (body: any) => {
  const { data } = await axiosInstance.post('/user/login', body);
  return data;
});

const initialState = {};
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
        window.location.replace('/');
        payload.isLoggedIn = true;
        state = payload;
        toastSuccess(payload.msg);
        return state;
      })
      .addCase(userLogin.rejected, () => {
        toastError('Something went wrong');
        return initialState;
      });
  },
});

export default userSlice.reducer;
