import * as React from 'react';
import styled from 'styled-components';
import logo from '../assets/MinorityReport_Logo.png';
import { Link } from 'react-router-dom';
const SCHeader = styled(Link)`
  width: 240px;
  height: 240px;
  display: inline-block;
  margin: auto;
  img {
    width: 240px;
  }
`;

function Header() {
  return (
    <SCHeader to={'/'}>
      <img src={logo} alt="Minority Report Crest by Hana Earles" />
    </SCHeader>
  );
}

export default Header;
