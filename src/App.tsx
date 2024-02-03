import FavoritesPage from 'pages/favorites-page';
import './App.css';
import MainPage from 'pages/main-page';
import { BrowserRouter, Outlet, Route, Routes, createBrowserRouter } from 'react-router-dom';
import Header from 'shared-components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
