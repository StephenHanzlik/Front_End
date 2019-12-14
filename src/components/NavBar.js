import React, { Component } from 'react';
import styled from 'styled-components';
//https://www.robinwieruch.de/react-styled-components

const Nav = styled.div`
  background: #4db6ac;
`;
const NavHeader = styled.div`
  max-width: 1010px;
  padding: 26px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;
// const NavLeft = styled.div`
//   width: 33.333%;
//   text-align: left;
// `;
// const NavCenter = styled.div`
//   width: 33.333%;
//   text-align: center;
// `;
// const Input = styled.input`
//   font-size: 16px;
//   border: solid 1px #dbdbdb;
//   border-radius: 3px;
//   color: #262626;
//   padding: 7px 33px;
//   border-radius: 3px;
//   color: #999;
//   cursor: text;
//   font-size: 14px;
//   font-weight: 300;
//   text-align: center;
//   background: #fafafa;
//   &:active,
//   &:focus {
//     text-align: left;
//   }
// `;
// const NavRight = styled.div`
//   width: 33.333%;
//   text-align: right;
//   svg {
//     margin-right: 20px;
//   }
// `;

class NavBar extends Component {
    render(){
        return (
            <Nav>
            <NavHeader>
              {/* <NavLeft>Stylagram</NavLeft>
              <NavCenter>
                <Input type="text" placeholder="Search" />
              </NavCenter>
              <NavRight>

              </NavRight> */}
            </NavHeader>
          </Nav>
        )
    }
}

export default NavBar;