import GeoJsonFeatureCollection from '../classes/geoJsonFeatureCollection';

//Defualt param that is overiding my store

const geoJsonReducer = (state = new GeoJsonFeatureCollection(), action) => {
    console.log("Reducer - state", state);
    switch (action.type) {
        case "SET_GEOJSON":
            return Object.assign({}, state, action.payload)
        default:
            return state;   
    }
}
export default geoJsonReducer;