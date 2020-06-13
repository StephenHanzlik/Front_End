import React, { Component } from 'react';
import styled from 'styled-components';
import leftArrowImg from '../images/left-arrow.png';
import rightArrowImg from '../images/right-arrow.png';


const ButtonWrapper = styled.div`
    width: 28px;
    height: 28px;
`;

const LeftArrowButton = styled.img`
    max-width:100%;
    max-height:100%
`;

const RightArrowButton = styled.image`
    background-image: url(${rightArrowImg});
`;

class ArrowButton extends Component {

    render(){
        return (
        <ButtonWrapper>
            <LeftArrowButton src={leftArrowImg}/>
        </ButtonWrapper>
        )
    }
}

export default ArrowButton;
