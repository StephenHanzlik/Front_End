import GeoJsonFeatureCollection from '../classes/geoJsonFeatureCollection';

const geoJsonReducer = (state = new GeoJsonFeatureCollection(), action) => {
    switch (action.type) {
        case "SET_GEOJSON":
            return Object.assign({}, state, action.payload)
        default:
            return state;
    }
}
export default geoJsonReducer;