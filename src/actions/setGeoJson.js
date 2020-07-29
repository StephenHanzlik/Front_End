export function setGeoJson(geoJson) {
    console.log("setGeoJson")
    return {
        type: "SET_GEOJSON",
        payload: geoJson
    };
}