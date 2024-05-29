import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { Api } from '../api/api';

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
