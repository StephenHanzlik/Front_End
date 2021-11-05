import React from 'react';
import '../App.css';
import LandingBody from '../components/LandingBody';
import {withRouter} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const LandingPage = (props) => {

    const isBigScreen = useMediaQuery({ minWidth: 1824 });
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const isMobile = useMediaQuery({ maxWidth: 767 });


    let deviceType;
    if (isBigScreen) {
        deviceType = 'isBigScreen';
    } else if (isDesktopOrLaptop) {
        deviceType = 'isDesktopOrLaptop';
    } else if (isTablet) {
        deviceType = 'isTablet';
    } else if (isMobile) {
        deviceType = 'isMobile';
    } else {
        deviceType = 'isNotMobile';
    }

    return (
        <>
            <LandingBody deviceType={deviceType}/>
        </> 
    )
}
export default withRouter(LandingPage);
