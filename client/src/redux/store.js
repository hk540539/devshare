import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducers';

const initialState = {};

const middleware = [ thunk ];

//const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
