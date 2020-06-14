
export default class GeoJsonFeatureCollection {

    constructor() {
        this.type = "geojson";
        this.data =  {
            type: 'FeatureCollection',
            features: []
        }
    };

}
