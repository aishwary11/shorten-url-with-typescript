import store from '../store';

type Url = {
  shortUrl: string;
  longUrl: string;
  urlCode: string;
  createdAt: string;
};
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
