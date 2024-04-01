import * as React from 'react';
import {type PropsWithChildren} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {MovieProvider} from '../movie';

const queryClient = new QueryClient();

export const ReactQueryProvider = ({children}: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieProvider>{children}</MovieProvider>
    </QueryClientProvider>
  );
};
