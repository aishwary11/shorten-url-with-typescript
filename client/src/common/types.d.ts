import store from '../store';

type Url = {
  shortUrl: string;
  longUrl: string;
  urlCode: string;
  createdAt: string;
};
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
