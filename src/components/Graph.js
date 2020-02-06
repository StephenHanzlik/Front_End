import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
// import styled from 'styled-components';
import testData from '../graphTestData';
import styled from 'styled-components';
import axios from 'axios';

const GraphWrapper = styled.div`
    width: 1200px;
    height: 30vh;
`;

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: testData.testData,
          observations: []
        };

        this.wrapJsonData =  this.wrapJsonData.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:3000/api/v1/observations')
        .then(response => {
            console.log("response", response)
            // const tempResponse = this.wrapJsonData(response.data);
            this.setState({
                observations: response.data
            })
        })
        .catch(error => console.log(error))
    }

    wrapJsonData(data){
        console.log("data", data);
        const coOrdinateData = data.map((observation)=>{
            return {"x": observation.Date, "y": observation.Air_Temperature_Observed_degF}
        })

        return [{
            "id": "Snow Depth",
            "color": "hsl(216, 70%, 50%)",
            "data": [coOrdinateData]
          }];
    }
    
    render(){
        return(
            <GraphWrapper>
                <ResponsiveLine
                    data={this.wrapJsonData(this.state.observations)}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                    curve="natural"
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
                        legend: 'inches',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    colors={{ scheme: 'paired' }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    enableArea={true}
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
            </GraphWrapper>
        )
    }
}

export default Graph;