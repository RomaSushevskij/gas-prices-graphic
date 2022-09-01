import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { ethereumReducer } from './reducers/ethereum/ethereumReducer';

export const rootReducer = combineReducers({
  ethereum: ethereumReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});
