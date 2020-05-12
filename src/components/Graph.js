import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
import testData from '../graphTestData';
import styled from 'styled-components';
import moment from "moment";

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
        this.wrapObservations = this.wrapObservations.bind(this);
        this.getRequiredDateFormat = this.getRequiredDateFormat.bind(this);
    }

    componentDidMount() {
        //TODO:  Pull observation data here and display it for graph
        // axios.get('http://localhost:8081/EnosJava/api/snotel/stations')
        // .then(response => {             
        //     this.setState({
        //         observations: response.data
        //     })
        // })
        // .catch(error => console.log(error))
        // console.log("mount this.props.observations", this.props.observations)
    }

    componentDidUpdate(){
        if(this.state.observations !== this.props.observations){
            this.setState({          
                observations: this.props.observations
            });
        }
    }

    wrapObservations(observations) {
        const snowDepthData = observations.map((observation) => {
            return { "x": observation.date, "y": parseInt(observation.snowDepth) }
        });
        return [{
            "id": "Snow Depth",
            "color": "hsl(216, 70%, 50%)",
            "data": snowDepthData
        }];
    }

    getRequiredDateFormat(timeStamp, format = "MM-DD-YYYY") {
        return moment(timeStamp).format(format);
    };

    //Sample Data
    //this.state.data
    //Live Data
    //this.wrapJsonData(this.state.observations)
    render() {
        return (
            <GraphWrapper>
                { this.props.observations === [] ?
                    <h3>Select a Station</h3>
                    :
                    <ResponsiveLine
                    data={this.wrapObservations(this.state.observations)}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: '0', max: 'auto', stacked: true, reverse: false }}
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
                        legendPosition: 'middle',
                        format: values => {
                            // console.log("values", values);
                            let observations = this.state.observations;
                            const month = values.toString().slice(5, 7);
                            const day = values.toString().slice(8, 10);
                            console.log("month", month)
                            // console.log("observations", observations)
                            console.log("day", day)
                            if (day === '01') {
                                observations = observations.filter(item => item !== month);
                              return `${this.getRequiredDateFormat(values, "MMMM")}`;
                            } 
                            else return "";
                          },
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
                    // pointSize={10}
                    // pointColor={{ theme: 'background' }}
                    // pointBorderWidth={2}
                    // pointBorderColor={{ from: 'serieColor' }}
                    // pointLabel="y"
                    // pointLabelYOffset={-12}
                    enableArea={true}
                    enablePoints={false}
                    enableGridX={false}
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
                }
                
            </GraphWrapper>
        )
    }
}

export default Graph;