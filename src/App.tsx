import FavoritesPage from 'pages/favorites-page';
import './App.css';
import MainPage from 'pages/main-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from 'shared-components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
/* import dotenv from 'dotenv';

dotenv.config(); */

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/favorites' element={<FavoritesPage />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
