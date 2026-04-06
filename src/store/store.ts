import { configureStore } from '@reduxjs/toolkit';
import dealReducer from './slices/dealSlice';
import investorReducer from './slices/investorSlice';

export const store = configureStore({
  reducer: {
    deals: dealReducer,
    investors: investorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;