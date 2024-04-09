import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './Reducers/userType';
import dataReducer from './Reducers/productData';

const rootreducer = combineReducers({ userReducer, dataReducer })

const store = createStore( rootreducer, applyMiddleware(thunk));

export default store;