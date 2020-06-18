import { createStore, combineReducers } from 'redux';

import geoJson from './reducers/geoJsonReducer';


export default createStore(
    combineReducers({
        geoJson
    }),
    {}
);