import * as React from 'react';
import styled from 'styled-components';
import wordpress, { WordpressPost } from '../../services/wordpress';
import Header from '../Header';
import media from '../../media';
import { RouteComponentProps, useParams, Redirect } from 'react-router-dom';
import useScrollToTop from '../../hooks/useScrollToTop';
import useMetaTags from 'react-metatags-hook';
import logo from '../../assets/MinorityReport_Logo.jpg';
import qs from 'query-string';
import FeaturedPost from './FeaturedPost';
import PostListItem from './PostListItem';
import MixBanner from '../MixBanner';
var ReactGA = require('react-ga');

const SCPostList = styled.section`
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

const SCOlderPosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  article {
    box-sizing: border-box;
    ${media.min.large} {
      flex-direction: column;
      width: 50%;
    }
  }
`;
interface PostListProps extends RouteComponentProps {
  setPost: Function;
  setPosts: Function;
  posts: Array<WordpressPost>;
  withMixes?: boolean;
}

function PostList({
  posts,
  setPosts,
  setPost,
  history,
  location,
  withMixes
}: PostListProps) {
  const { author } = useParams();
  const [loaded, setLoaded] = React.useState(false);

  useScrollToTop();

  const title =
    author && posts[0]
      ? `Author: ${posts[0].author_x.name}`
      : `Minority Report`;

  useMetaTags(
    {
      title: title + ' - min.report',
      openGraph: {
        title,
        image: `${window.location.protocol}//${window.location.host}${logo}`,
        site_name: 'Minority Report',
      },
      twitter: {
        card: 'summary',
        title: title,
      },
    },
    [author, posts.length]
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
        ReactGA.pageview(history.location.pathname);
      }, 50);
    }

    loadContent();

    if (author) {
      return () => {
        setPosts([]);
      };
    }
  }, [author]);

  const goToPost = (post: WordpressPost) => {
    setPost(post);
  };

  if (!loaded) {
    return (
      <SCPostList>
        <SCAuthorTitle>
          <Header />
          <h1>Loading...</h1>
        </SCAuthorTitle>
      </SCPostList>
    );
  }

  const query = qs.parse(location.search);
  if (query.preview) {
    return <Redirect to={`preview/preview/?preview_id=${query.p}`}></Redirect>;
  }

  const featuredPost = posts[0];

  return (
    <>
      <SCPostList>
        {author && posts.length > 0 && (
          <>
            <SCAuthorTitle>
              <Header />
              <h1>{posts[0].author_x.name}</h1>
            </SCAuthorTitle>
          </>
        )}
        {!author && featuredPost && (
          <FeaturedPost post={featuredPost} goToPost={goToPost} />
        )}
        <MixBanner />
        <SCOlderPosts>
          {posts.map((post, index) =>
            index === 0 && !author ? (
              <React.Fragment key={post.id}></React.Fragment>
            ) : (
              <PostListItem
                key={post.id}
                post={post}
                goToPost={goToPost}
              ></PostListItem>
            )
          )}
        </SCOlderPosts>
      </SCPostList>
    </>
  );
}

export default PostList;
