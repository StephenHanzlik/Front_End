import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Source } from 'react-mapbox-gl';
import axios from 'axios';
import { svg } from '../images/test.svg';

const MapBox = ReactMapboxGl({
    // This is a public sandbox token.  It should be hidden as environment variable once I get new token for production.
    accessToken:
      'pk.eyJ1Ijoic3RlcGhlbmhhbnpsaWsiLCJhIjoiY2o1d3l5ZGhqMDJ3azJ3cXFxc2FsYjQzcyJ9.nvGZW-k1vzXxmWxmadEPmw'
  });

// // Define layout to use in Layer component
// const layoutLayer = { 'icon-image': 'londonCycle' };


// // Create an image for the Layer
// const image = new Image();
// image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svg);
// const images = ['londonCycle', image];

const POSITION_CIRCLE_PAINT = {
    'circle-stroke-width': 4,
    'circle-radius': 10,
    'circle-blur': 0.15,
    'circle-color': '#3770C6',
    'circle-stroke-color': 'white'
  };

  const GEOJSON_SOURCE_OPTIONS = {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-0.13235092163085938,51.518250335096376]
      },
      properties: {
        title: 'Mapbox DC',
        'marker-symbol': 'monument'
      }
    }
  };

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stationGeoJson: []
        };

    }

    convertToGeoJson(stations){
    let geoJson = stations.map(station => {
       let coordinates = [];
       let location = JSON.parse(station.location);

       coordinates.push(location.lat);
       coordinates.push(location.lng);

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
             
            this.setState({
                stationGeoJson: tempGeoJson
            })
        })
        .catch(error => console.log(error))
    }

    render(){
        //https://alex3165.github.io/react-mapbox-gl/demos

        return(
             <MapBox
                style="mapbox://styles/mapbox/outdoors-v11"
                containerStyle={{
                    width: '1200px',
                    height: '60vh'
                }}
            >
            <div>
              <Source id="example_id" geoJsonSource={GEOJSON_SOURCE_OPTIONS} />
              <Layer
                type="circle"
                id="example_id_marker"
                paint={POSITION_CIRCLE_PAINT}
                sourceId={'example_id'}
              />
            </div>
            {/* <Layer type="symbol" id="marker" 
                    paint={POSITION_CIRCLE_PAINT}
                >
                    <Feature coordinates={[-0.13235092163085938,51.518250335096376]} />
                </Layer> */}
            </MapBox>
        )
    }
}

export default Map;