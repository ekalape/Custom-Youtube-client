import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FavoritesPage from 'pages/favorites-page';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from 'pages/main-page';
import VideoPage from 'shared-components/VideoPage';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/video/:id',
        element: <VideoPage />,
      },
      {
        path: '/favorites',
        element: <FavoritesPage />,
      },
      {
        path: '/',
        element: <MainPage />,
      },
    ],
  },
]);

root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
