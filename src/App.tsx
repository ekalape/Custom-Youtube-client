import FavoritesPage from 'pages/favorites-page';
import './App.css';
import MainPage from 'pages/main-page';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from 'shared-components/Header';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/favorites',
    element: <FavoritesPage />,
  },
]);

const App = () => {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
