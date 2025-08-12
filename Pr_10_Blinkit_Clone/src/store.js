// import { createStore } from "redux";
// import { rootReducer } from "./Services/Reducers";

// export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./Services/Reducers";
import {thunk} from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));