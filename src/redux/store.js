// store.js
import { createStore, combineReducers } from 'redux';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  // Otros reducers aquí si los tienes
});

const store = createStore(rootReducer);

export default store;
