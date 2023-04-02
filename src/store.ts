// src/store.ts
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { walletReducer } from './reducers/walletReducer';

const rootReducer = combineReducers({
  wallet: walletReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
