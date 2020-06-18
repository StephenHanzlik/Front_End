import GeoJsonFeatureCollection from '../classes/geoJsonFeatureCollection';

const initialState = {
    geoJson: new GeoJsonFeatureCollection()
} 

const geoJsonReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_GEOJSON":
            return Object.assign({}, state, action.payload)
        default:
            return state;
    }
}
export default geoJsonReducer;