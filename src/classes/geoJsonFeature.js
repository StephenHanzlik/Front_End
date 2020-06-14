
export default class GeoJsonFeature {

    constructor(coordinates, name, elevation, triplet, timezone, wind) {
        this.type = 'Feature';
        this.geometry = {
            'type': 'Point',
            'coordinates': coordinates
        };
        this.properties = {
            'title': name,
            'elevation': elevation,
            'triplet': triplet,
            'timezone': timezone,
            'wind': wind,
            'icon': 'marker'
        }
    };

}

