import * as React from 'react';
import styled from 'styled-components';
import FeaturedPost from './PostList/FeaturedPost';
import logo from '../assets/MinorityReport_Logo.jpg';
import useMetaTags from 'react-metatags-hook';
import PostList from './PostList';
import useScrollToTop from '../hooks/useScrollToTop';
import { Redirect } from 'react-router-dom';
import qs from 'query-string';
var ReactGA = require('react-ga');

const SCHomepage = styled.section`
  max-width: 1050px;
  margin: auto;
  min-height: 100vh;
`;

function Homepage({posts, setPost, mixes, location}: any) {
    useScrollToTop();
    const title = "Minority Report";
    useMetaTags(
      {
        title: title + ' - min.report',
        openGraph: {
          title,
          image: `${window.location.protocol}//${window.location.host}${logo}`,
          site_name: title,
        },
        twitter: {
          card: 'summary',
          title: title,
        },
      },
      [posts.length]
    );

    React.useEffect(() => {
      ReactGA.pageview(window.location.pathname);
    }, [])

  const query = qs.parse(location.search);
  if (query.preview) {
    return <Redirect to={`preview/preview/?preview_id=${query.p}`}></Redirect>;
  }

  if(!posts.length) {
    return <SCHomepage></SCHomepage>;
  }
  return (
    <SCHomepage>
        <FeaturedPost post={posts[0]} goToPost={setPost}></FeaturedPost>
        <PostList posts={posts.slice(1,posts.length)} setPost={setPost} mixes={mixes} />
    </SCHomepage>
  );
}

export default Homepage;
