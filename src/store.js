import { createStore } from 'redux';
import geoJson from './reducers/geoJsonReducer';

export default createStore(geoJson)
// export default createStore(
//     combineReducers({
//         geoJson
//     }),
//     {}
// );

//**********************
// combineReducers is responsible for the 3 overrides of state
//  with just createStore() it only runs the reducer once but stat
//  state is still empty of GeoJson features.s