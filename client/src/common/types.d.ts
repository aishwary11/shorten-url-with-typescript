type Url = {
  shortUrl: string;
  longUrl: string;
  urlCode: string;
  createdAt: string;
};
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
