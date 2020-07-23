import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import ArticleHead from './ArticleHead';
import styled from 'styled-components';
import useMetaTags from 'react-metatags-hook';

const SCError = styled.div`
  padding-bottom: 3em;
`;

function Error({}: RouteComponentProps) {
  const metaTags = {
    title: 'min.report - Page not found',
  };

  useMetaTags(metaTags);
  return (
    <SCError>
      <ArticleHead title={<h1>This page does not exist...</h1>}>
        <Link to='/'>Go back to the home page</Link>
      </ArticleHead>
    </SCError>
  );
}

export default Error;
