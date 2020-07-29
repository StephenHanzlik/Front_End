import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from "react-redux";
import store from "./store";

// *****************************************
// This is broken out into another file.
// createStore(), specifically, combineReducers() is responsible for the 3 reducer calls 
// that are also resetting state 
// ****************************************
// import geoJson from './reducers/geoJsonReducer';
console.log("Index - creating store")
// const store = createStore(geoJson)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,     
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
