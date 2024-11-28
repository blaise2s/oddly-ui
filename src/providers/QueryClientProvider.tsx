import { ReactNode } from 'react';
import {
  QueryClientProvider as QCP,
  QueryClient,
} from '../wrappers/queryClient';

const queryClient = new QueryClient();

interface QueryClientProviderProps {
  children: ReactNode;
}

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
  return <QCP client={queryClient}>{children}</QCP>;
};
