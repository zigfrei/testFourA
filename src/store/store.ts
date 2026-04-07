import { configureStore } from '@reduxjs/toolkit';
import tariffsUiReducer from './slices/tariffsUiSlice';

export const store = configureStore({
  reducer: {
    tariffsUi: tariffsUiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
