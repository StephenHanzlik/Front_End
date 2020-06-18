export function setGeoJson(geoJson) {
    return {
        type: "SET_GEOJSON",
        payload: geoJson
    };
}