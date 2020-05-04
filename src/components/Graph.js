import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
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
        console.log("working Data: ", this.state.data);

        //TODO:  Pull observation data here and display it for graph
        axios.get('http://localhost:8081/EnosJava/api/snotel/stations')
        .then(response => {
            console.log("API wrapped data", this.wrapJsonData(response.data))
             
            this.setState({
                observations: response.data
            })
        })
        .catch(error => console.log(error))
    }

    wrapJsonData(data){
        console.log("data", data);
        const snowDepthData = data.map((observation)=>{
            return {"x": observation.Date, "y": parseInt(observation.Snow_Depth_In)}
        })

        return [{
            "id": "Snow Depth",
            "color": "hsl(216, 70%, 50%)",
            "data": snowDepthData
          }];
    }
    
    //Sample Data
    //this.state.data
    //Live Data
    //this.wrapJsonData(this.state.observations)
    render(){
        return(
            <GraphWrapper>
                <ResponsiveLine
                    data={this.state.data}
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
                        legend: 'Month',
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