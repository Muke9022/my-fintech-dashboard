'use client';
import { Provider } from 'react-redux';
import { store } from './store'; // Check karo store.ts isi folder mein hai na?

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}