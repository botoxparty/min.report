


  import * as React from 'react';
import styled from 'styled-components';
import logo from '../assets/MinorityReport_Logo.jpg';
import useMetaTags from 'react-metatags-hook';
import { useParams } from 'react-router-dom';
import wordpress from '../services/wordpress';
import PostList from './PostList';
import Header from './Header';
import useScrollToTop from '../hooks/useScrollToTop';
var ReactGA = require('react-ga');

const SCAuthor = styled.section`
  max-width: 1050px;
  margin: auto;
  min-height: 100vh;
`;

const SCAuthorTitle = styled.div`
  text-align: center;
  margin-top: 2em;
  h1 {
    font-size: 3em;
    margin-bottom: 0.25em;
  }
`;


function Author({posts, setPost, setPosts, mixes}: any) {
    const [loaded, setLoaded] = React.useState(false);
    const { author } = useParams<any>();


    const title =
    author && posts[0]
      ? `Author: ${posts[0].author_x.name}`
      : `Minority Report`;
      useScrollToTop();

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
    async function loadContent() {
      if (author) {
        setLoaded(false);
        const { data } = await wordpress.getPostsByAuthor(author);
        setPosts(data);
      }
      setLoaded(true);
      (window as any).prerenderReady = true;
      setTimeout(() => {
        ReactGA.pageview(window.location.pathname);
      }, 50);
    }

    loadContent();

    if (author) {
      return () => {
        setPosts([]);
      };
    }
  }, [author]);

  if(!posts.length) {
    return <SCAuthor></SCAuthor>;
  }

  return (
    <SCAuthor>
      <SCAuthorTitle>
        <Header />
        <h1>{posts[0].author_x.name}</h1>
      </SCAuthorTitle>
      <PostList posts={posts} setPost={setPost} mixes={[]}/>
    </SCAuthor>
  );
}

export default Author;
