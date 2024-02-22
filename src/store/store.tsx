import { Store, combineReducers, configureStore } from '@reduxjs/toolkit/react';
import searchReducer from './slices/searchSlice';

const reducers = combineReducers({
  search: searchReducer,
});

const store: Store = configureStore({ reducer: reducers });

export default store;
export type StoreStateType = ReturnType<typeof store.getState>;
