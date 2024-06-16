import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import constant from '../common/constant';
import { axiosInstance, encryptData, toastSuccess } from '../common/utils';

export const userLogin = createAsyncThunk('user/login', async (body: any) => {
  const { data } = await axiosInstance.post('/login', body);
  localStorage.setItem(constant.token, data.data.token);
  return data;
});

const initialState = {};
const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: initialState,
  extraReducers: builder => {
    builder
      .addCase(userLogin.pending, () => {
        return initialState;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        payload.data.token = encryptData(payload.data.token);
        payload.isLoggedIn = true;
        state = payload;
        toastSuccess(payload.msg);
        return payload;
      })
      .addCase(userLogin.rejected, () => {
        // toastError('Something went wrong');
        return initialState;
      });
  },
});

export default userSlice.reducer;
