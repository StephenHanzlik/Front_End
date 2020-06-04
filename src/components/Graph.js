import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
import testData from '../graphTestData';
import styled from 'styled-components';

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
        this.getMonthName = this.getMonthName.bind(this);
    }

    componentDidUpdate() {
        if (this.state.observations !== this.props.observations) {
            this.setState({
                observations: this.props.observations
            });
        }
    }

    wrapObservations(observations) {

        console.log("observations 1: ", observations)

        let snowDepthData = observations.filter(observation => {
            return !isNaN(parseInt(observation.snowDepth))
        })

        snowDepthData = snowDepthData.map(observation => {
            return  { "x": observation.date, "y": parseInt(observation.snowDepth) }
        });
        
        return [{
            "id": "Snow Depth",
            "color": "hsl(216, 70%, 50%)",
            "data": snowDepthData
        }];
    }

    getMonthName(monthNumber) {
        switch (monthNumber) {
            case '01':
                return 'January'
            case '02':
                return 'February'
            case '03':
                return 'March'
            case '04':
                return 'April'
            case '05':
                return 'May'
            case '06':
                return 'June'
            case '07':
                return 'July'
            case '08':
                return 'August'
            case '09':
                return 'September'
            case '10':
                return 'October'
            case '11':
                return 'November'
            case '12':
                return 'December'
            default:
                break;
        }
    }

    render() {
        return (
            <GraphWrapper>
                {this.props.observations === [] ?
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
                                const month = values.toString().slice(5, 7);
                                const day = values.toString().slice(8, 10);
                                if (day === '01'){
                                    return this.getMonthName(month);
                                }else return "";
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