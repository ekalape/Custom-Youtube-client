import './App.css';
import { Outlet } from 'react-router-dom';
import Header from 'shared-components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from 'store/store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Outlet />
      </Provider>
    </>
  );
};

export default App;
