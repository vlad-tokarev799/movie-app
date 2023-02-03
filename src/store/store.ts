import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './reducers/movies-reducer';
import errorReducer from './reducers/error-reducer';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
