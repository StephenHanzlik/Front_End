import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
// import { ResponsiveBarCanvas } from '@nivo/bar'
import testData from '../graphTestData';
import styled from 'styled-components';
import ObservationDataSet from '../classes/ObservationDataSet';
import ObservationDataPoint from '../classes/ObservationDataPoint';

const GraphWrapper = styled.div`
    // width: 1200px;
    width: ${props => props.deviceType === 'isBigScreen' || props.deviceType === 'isDesktopOrLaptop' ? '80rem': '35rem'};
    margin-left: ${props => props.deviceType === 'isBigScreen' || props.deviceType === 'isDesktopOrLaptop' ? '': '150rem'};
    height: 30vh;
    // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    // border-radius: 5px;
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

    safeParseAndWrap(observations, graphType, title){
        let dataSetArray = [];
        let dataSet = observations.filter(observation => {
                            return !isNaN(parseInt(observation[graphType]))
                        }).map(observation => {
                            return new ObservationDataPoint(observation.date, parseInt(observation[graphType]));
                        });
        dataSetArray.push(new ObservationDataSet(title, "hsl(216, 70%, 50%)", dataSet));
        return dataSetArray
    }

    wrapObservations() {
        let graphType = this.props.graphType;
        let observations = this.props.observations;
        // let stationName = this.props.stationName;
        // let fixedOrDynamic = this.props.fixedOrDynamic;
        // let title;
        // switch (graphType){
        //     case 'snowDepth':
        //         title = 'Snow Depth';
        //         break;
        //     case 'changeInSnowDepth':
        //         title = 'Change in Snow Depth';
        //         break;
        //     case 'snowWaterEquivalent':
        //         title = 'Snow Water Equivalent';
        //         break;
        //     case 'changeInSnowWaterEquivalent':
        //         title = 'Change in Snow Water Equivalent';
        //         break;
        //     case 'airTemperatureObserved':
        //         title = 'Air Temperature Observed';
        //         break;
        //     case 'airTemperatureAverage':
        //         title = 'Air Temperature Averagre';
        //         break;
        //     case 'airTemperatureMax':
        //         title = 'Air Temperature Max';
        //         break;
        //     case 'airTemperatureMin':
        //         title = 'Air Temperature Min';
        //         break;   
        //     default:
        //         title = 'Snow Depth';
        // }
        // if(stationName){
        //     title = `${title} - ${stationName} - ${fixedOrDynamic}`
        // }
        return this.safeParseAndWrap(observations, graphType, 'Snow Depth');
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

    setDeviceWidth(deviceType, parent) {
        let width;
        let height;
        let paddingLeft;
        if (deviceType === 'isBigScreen') {
            width = '60rem';
            height = '30vh';
            paddingLeft = '45px';
        } else if (deviceType === 'isDesktopOrLaptop') {
            width = '54rem';
            height = '30vh';
            paddingLeft = '42px';
        } else if (deviceType === 'isTablet') {
            width = '42rem';
            height = '25vh';
            paddingLeft = '0px';
        } else if (deviceType === 'isMobile' && parent === 'map') {
            width = '30rem';
            height = '30vh';
            paddingLeft = '54px';
        } else if (deviceType === 'isMobile' && parent === 'stations') {
            width = '28rem';
            height = '30vh';
            paddingLeft = '0px';
        } 
        else {
            width = '30rem';
            height = '30vh';
        }
        return { 
            'width': width,
            'height': height,
            'paddingLeft': paddingLeft
        }
    }

    render() {
        const deviceSetting = this.setDeviceWidth(this.props.deviceType, this.props.parent);
        const graphWrapperStyle = {
            'height': deviceSetting.height,
            'margin-left': 'auto',
            'margin-right': 'auto',
            'width': deviceSetting.width,
            'padding-left': deviceSetting.paddingLeft
        }
        return (
            // <GraphWrapper>
            <div style={graphWrapperStyle}>
                {/* {console.log("Graph - props.observations", this.props.observations)} */}
                {!this.props.observations ?
                    <h3>Select a Station</h3>
                    :
                    <ResponsiveLine
                        data={this.wrapObservations()}
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
                            legend: '',
                            legendOffset: 36,
                            legendPosition: 'middle',
                            format: values => {
                                const month = values.toString().slice(5, 7);
                                const day = values.toString().slice(8, 10);
                                if(day === '01'){
                                    return this.getMonthName(month);
                                }else return "";
                            },
                        }}
                        axisLeft={{
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: '',
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
                        enableGridX={true}
                        useMesh={true}
                        legends={[
                            {
                                anchor: 'top',
                                direction: 'column',
                                justify: false,
                                translateX: 0,
                                translateY: -24,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 0,
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
            </div>
            // </GraphWrapper>
        )
    }
}

export default Graph;