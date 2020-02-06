import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const MapBox = ReactMapboxGl({
    // This is a public sanbox toke.  It should be hidden as environment variable once I get new token for production.
    accessToken:
      'pk.eyJ1Ijoic3RlcGhlbmhhbnpsaWsiLCJhIjoiY2o1d3l5ZGhqMDJ3azJ3cXFxc2FsYjQzcyJ9.nvGZW-k1vzXxmWxmadEPmw'
  });

class Map extends Component {
    render(){
        return(
            <MapBox
                style="mapbox://styles/mapbox/outdoors-v11"
                containerStyle={{
                    width: '1200px',
                    height: '60vh'
                }}
            >
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
            </Layer>
            </MapBox>
        )
    }
}

export default Map;