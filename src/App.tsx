import FavoritesPage from 'pages/favorites-page';
import './App.css';
import MainPage from 'pages/main-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from 'shared-components/Header';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
