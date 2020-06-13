import React, { Component } from 'react';
import styled from 'styled-components';
import leftArrowImg from '../images/left-arrow.png';
import rightArrowImg from '../images/right-arrow.png';


const ButtonWrapper = styled.div`
    width: 28px;
    height: 28px;
    margin: 12px 5px 10px 5px;
`;

const Img = styled.img`
    max-width:100%;
    max-height:100%
`;

class ArrowButton extends Component {

    render(){
        return (
            <ButtonWrapper>
            { this.props.leftArrow &&
                <Img src={leftArrowImg}/>
            }
            { this.props.rightArrow &&
                <Img src={rightArrowImg}/>
            }
            </ButtonWrapper>
        )
    }
}

export default ArrowButton;
