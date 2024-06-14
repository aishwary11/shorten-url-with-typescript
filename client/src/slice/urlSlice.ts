import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance, toastError, toastSuccess } from '../common/utility';

export const urlList = createAsyncThunk('url/list', async () => {
  const { data } = await axiosInstance.get('/');
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
        return payload;
      })
      .addCase(urlList.rejected, () => {
        toastError('Something went wrong');
        return initialState;
      });
  },
});

export default urlSlice.reducer;
