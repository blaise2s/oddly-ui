import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from './providers/QueryClientProvider';
import { RouterProvider } from './providers/RouterProvider';
import { ThemeProvider } from './providers/ThemeProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider>
      <ThemeProvider>
        <RouterProvider />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
