import store from '../store';

type Url = {
  shortUrl: string;
  longUrl: string;
  urlCode: string;
  createdAt: string;
};
type Theme = {
  dark: string;
  light: string;
};
type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
