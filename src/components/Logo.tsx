import * as React from 'react';
import styled from 'styled-components';
import logo from '../assets/MinorityReport_Logo.png';
import { Link } from 'react-router-dom';
const SCHeader = styled(Link)`
  max-width: 240px;
  max-height: 240px;
  display: inline-block;
  margin: auto;
  img {
    width: 240px;
  }
`;

interface Props {
  link?: string;
}

function Header({link}: Props) {
  return (
    <SCHeader to={link || '/'}>
      <img src={logo} alt='Minority Report Crest by Hana Earles' />
    </SCHeader>
  );
}

export default Header;
