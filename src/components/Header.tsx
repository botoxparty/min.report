import * as React from 'react';
import styled from 'styled-components';
import logo from '../assets/MinorityReport_Logo.jpg';
import { Link } from 'react-router-dom';
const SCHeader = styled(Link)`
  img {
    width: 240px;
  }
`;

interface HeaderProps {
  to: string;
}
function Header() {
  return (
    <SCHeader to={'/'}>
      <img src={logo} alt="Minority Report Crest by Hana Earles" />
    </SCHeader>
  );
}

export default Header;
