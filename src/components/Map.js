import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Source } from 'react-mapbox-gl';
import axios from 'axios';

const MapBox = ReactMapboxGl({
    // This is a public sandbox token.  It should be hidden as environment variable once I get new token for production.
    accessToken:
      'pk.eyJ1Ijoic3RlcGhlbmhhbnpsaWsiLCJhIjoiY2o1d3l5ZGhqMDJ3azJ3cXFxc2FsYjQzcyJ9.nvGZW-k1vzXxmWxmadEPmw'
  });

const POSITION_CIRCLE_PAINT = {
    'circle-stroke-width': 4,
    'circle-radius': 10,
    'circle-blur': 0.15,
    'circle-color': '#3770C6',
    'circle-stroke-color': 'white'
  };

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stationGeoJson: [],
            renderStations: false
        };

    }

    convertToGeoJson(stations){
    let geoJson = stations.map(station => {
       let coordinates = [];
       let location = JSON.parse(station.location);
       
       coordinates.push(location.lng);
       coordinates.push(location.lat);
      

       let geoJsonItem = {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: coordinates
                },
                properties: {
                    title: station.name,
                    'marker-symbol': 'monument'
                }
            }
           }
        return geoJsonItem
    })
    return geoJson;
    };

    componentDidMount(){

        axios.get('http://localhost:8081/EnosJava/api/snotel/stations')
        .then(response => {
            console.log("Data in Map Component: ", response.data);

            let tempGeoJson = this.convertToGeoJson(response.data);

            console.log("tempGeoJSON: " + tempGeoJson)
             
            this.setState({
                stationGeoJson: tempGeoJson,
                renderStations: true
            })
        })
        .catch(error => console.log(error))
    }

    render(){
        //https://alex3165.github.io/react-mapbox-gl/demos

        return(
             <MapBox
                style="mapbox://styles/mapbox/outdoors-v11"
                zoom={[4]}
                center={[-105.270546, 40.014984]}
                containerStyle={{
                    width: '1200px',
                    height: '60vh'
                }}
            >
            { 
            // this.state.renderStations ? ( 
                <div>
                    {this.state.stationGeoJson.map((GEOJSON_SOURCE_OPTIONS, index) => (
                        <div key={"container_" + index}>
                            <Source id={GEOJSON_SOURCE_OPTIONS.data.properties.title} key={"source_" + index} geoJsonSource={GEOJSON_SOURCE_OPTIONS} />
                            <Layer
                                type="circle"
                                key={"layer_" + index}
                                id="id_marker"
                                paint={POSITION_CIRCLE_PAINT}
                                sourceId={GEOJSON_SOURCE_OPTIONS.data.properties.title}
                            />   
                        </div>                
                    ))}
    
                </div>
            // ) : undefined    
            }
            </MapBox>
        )
    }
}

export default Map;