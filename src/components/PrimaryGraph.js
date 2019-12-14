import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
import styled from 'styled-components';

const PrimaryGraphWrapper = styled.div`
    width: 800px;
    height: 800px;
`

class PrimaryGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [
            {
              "id": "japan",
              "color": "hsl(216, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 217
                },
                {
                  "x": "helicopter",
                  "y": 164
                },
                {
                  "x": "boat",
                  "y": 176
                },
                {
                  "x": "train",
                  "y": 253
                },
                {
                  "x": "subway",
                  "y": 147
                },
                {
                  "x": "bus",
                  "y": 0
                },
                {
                  "x": "car",
                  "y": 252
                },
                {
                  "x": "moto",
                  "y": 27
                },
                {
                  "x": "bicycle",
                  "y": 230
                },
                {
                  "x": "horse",
                  "y": 67
                },
                {
                  "x": "skateboard",
                  "y": 296
                },
                {
                  "x": "others",
                  "y": 124
                }
              ]
            },
            {
              "id": "france",
              "color": "hsl(325, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 244
                },
                {
                  "x": "helicopter",
                  "y": 134
                },
                {
                  "x": "boat",
                  "y": 61
                },
                {
                  "x": "train",
                  "y": 100
                },
                {
                  "x": "subway",
                  "y": 277
                },
                {
                  "x": "bus",
                  "y": 250
                },
                {
                  "x": "car",
                  "y": 261
                },
                {
                  "x": "moto",
                  "y": 259
                },
                {
                  "x": "bicycle",
                  "y": 222
                },
                {
                  "x": "horse",
                  "y": 202
                },
                {
                  "x": "skateboard",
                  "y": 94
                },
                {
                  "x": "others",
                  "y": 59
                }
              ]
            },
            {
              "id": "us",
              "color": "hsl(302, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 149
                },
                {
                  "x": "helicopter",
                  "y": 224
                },
                {
                  "x": "boat",
                  "y": 51
                },
                {
                  "x": "train",
                  "y": 115
                },
                {
                  "x": "subway",
                  "y": 142
                },
                {
                  "x": "bus",
                  "y": 259
                },
                {
                  "x": "car",
                  "y": 117
                },
                {
                  "x": "moto",
                  "y": 298
                },
                {
                  "x": "bicycle",
                  "y": 18
                },
                {
                  "x": "horse",
                  "y": 218
                },
                {
                  "x": "skateboard",
                  "y": 255
                },
                {
                  "x": "others",
                  "y": 98
                }
              ]
            },
            {
              "id": "germany",
              "color": "hsl(255, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 133
                },
                {
                  "x": "helicopter",
                  "y": 284
                },
                {
                  "x": "boat",
                  "y": 108
                },
                {
                  "x": "train",
                  "y": 259
                },
                {
                  "x": "subway",
                  "y": 54
                },
                {
                  "x": "bus",
                  "y": 49
                },
                {
                  "x": "car",
                  "y": 16
                },
                {
                  "x": "moto",
                  "y": 87
                },
                {
                  "x": "bicycle",
                  "y": 159
                },
                {
                  "x": "horse",
                  "y": 61
                },
                {
                  "x": "skateboard",
                  "y": 47
                },
                {
                  "x": "others",
                  "y": 224
                }
              ]
            },
            {
              "id": "norway",
              "color": "hsl(74, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 52
                },
                {
                  "x": "helicopter",
                  "y": 30
                },
                {
                  "x": "boat",
                  "y": 51
                },
                {
                  "x": "train",
                  "y": 225
                },
                {
                  "x": "subway",
                  "y": 64
                },
                {
                  "x": "bus",
                  "y": 93
                },
                {
                  "x": "car",
                  "y": 266
                },
                {
                  "x": "moto",
                  "y": 116
                },
                {
                  "x": "bicycle",
                  "y": 70
                },
                {
                  "x": "horse",
                  "y": 233
                },
                {
                  "x": "skateboard",
                  "y": 190
                },
                {
                  "x": "others",
                  "y": 9
                }
              ]
            }
          ]
        };
      }
    
    render(){
        return(
            <PrimaryGraphWrapper>
                <ResponsiveLine
        data={this.state.data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />  
    </PrimaryGraphWrapper>
      
  
       

        )
    }
}

export default PrimaryGraph;