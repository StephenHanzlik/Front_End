import GeoJsonFeatureCollection from '../classes/geoJsonFeatureCollection';

const geoJsonFeatureCollection = new GeoJsonFeatureCollection();

const geoJsonReducer = (state = geoJsonFeatureCollection, action) => {
    switch (action.type) {
        case "SET_GEOJSON":
            state = {
                ...state,
                geoJson: action.payload
            };
            break;
        default:
            return state;
    }
}
export default geoJsonReducer;