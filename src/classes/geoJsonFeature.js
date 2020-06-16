
export default class GeoJsonFeature {
    constructor(lng, lat, name, elevation, triplet, timezone, wind) {
        this.type = 'Feature';
        this.geometry = {
            'type': 'Point',
            'coordinates': [lng, lat]
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

