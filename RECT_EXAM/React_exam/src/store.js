// src/store.js
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";           // redux-thunk v3+: named export
import rootReducer from "./Services/Reducers"; // default export from index.js

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store; // default export
