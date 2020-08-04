import * as React from 'react';
import styled from 'styled-components';
import com from '../assets/CoM_Secondary_A_White.png';
import media from '../media';
const SCFooter = styled.footer`
  background: black;
  color: white;
  padding: 0.25em;
  text-align: center;
  p {
    margin: 0;
  }
  .com {
    display: flex;
    justify-content: center;
    align-items: center;
    ${media.max.medium} {
      flex-direction: column-reverse;
    }
    img {
      height: 30px;
      margin-right: 1em;
    }
    p {
      font-size: 0.8em;
    }
  }
`;

function Footer() {
  return (
    <SCFooter>
      <p>Copyright 2020 min.report</p>
      <div className='com'>
        <img src={com} alt='City of Melbourne Logo'></img>
        <p>Supported by the City of Melbourne COVID-19 Arts Grants</p>
      </div>
    </SCFooter>
  );
}

export default Footer;
