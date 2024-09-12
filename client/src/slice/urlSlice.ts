import { axiosInstance, toastError, toastSuccess } from '@/common/utils.js';
import { Url } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const urlList = createAsyncThunk('url/list', async () => {
  const { data } = await axiosInstance.get('/url/');
  return data;
});

const initialState: Url[] = [];
const urlSlice = createSlice({
  name: 'Url',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(urlList.pending, () => {
        return initialState;
      })
      .addCase(urlList.fulfilled, (state, { payload }) => {
        toastSuccess(payload.msg);
        state = payload;
        return state;
      })
      .addCase(urlList.rejected, () => {
        toastError('Something went wrong');
        return initialState;
      });
  },
});

export default urlSlice.reducer;
