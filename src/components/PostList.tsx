import * as React from 'react';
import styled from 'styled-components';
import wordpress, { WordpressPost } from '../services/wordpress';
import Header from './Header';
import media from '../media';
import { RouteComponentProps, Link, useParams } from 'react-router-dom';
import useScrollToTop from '../hooks/useScrollToTop';
import useMetaTags from 'react-metatags-hook';
import logo from '../assets/MinorityReport_Logo.jpg';
import moment from 'moment';
var ReactGA = require('react-ga');

const SCPostList = styled.section`
  max-width: 1050px;
  margin: auto;
  min-height: 100vh;
`;

interface PostListItemProps {
  post: WordpressPost;
  goToPost: Function;
}

const SCFeaturedPost = styled.article`
  border-bottom: 1px dotted grey;
  margin-top: 2em;
  padding-bottom: 2em;
  .site-header-featured-post {
    display: flex;
    align-items: center;
    padding: 0 1em;
    ${media.max.medium} {
      flex-direction: column;
    }
    a {
      ${media.min.medium} {
        width: 80%;
      }
    }
    img {
      ${media.max.medium} {
        width: calc(100% + 2em);
        margin-left: -1em;
      }

      ${media.min.medium} {
        max-width: 100%;
        object-fit: cover;
        height: 100%;
      }
    }
  }
  .header-wrapper {
    ${media.min.medium} {
      padding-right: 2em;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    h1 {
      font-size: 3em;
      margin-bottom: 0.25em;
    }
    .author {
      margin-bottom: 1em;
      display: block;
      font-size: 1.25em;
    }
    time {
      display: block;
      margin-bottom: 1em;
    }
  }
  .excerpt {
    padding: 0 1em;
    line-height: 1.4;
    font-size: 1.25em;
  }
`;

const FeaturedPost = ({ post, goToPost }: PostListItemProps) => (
  <SCFeaturedPost>
    <div className="site-header-featured-post">
      <div className="header-wrapper">
        <Header />
        <div>
          <Link
            to={`/${post.author_x.slug}/${post.slug}`}
            onClick={() => goToPost(post)}
          >
            <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
          </Link>
          <span className="author">
            by{' '}
            <Link to={`/author/${post.author_x.slug}`}>
              {post.author_x.name}
            </Link>
          </span>
          <time>{moment(post.date_gmt).format('DD MMMM YYYY')}</time>
        </div>
      </div>
      <Link
        to={`/${post.author_x.slug}/${post.slug}`}
        onClick={() => goToPost(post)}
      >
        <img
          src={post.featured_img_x.thumb}
          alt={`${post.title.rendered} by ${post.author_x.name}`}
        />
      </Link>
    </div>
    <Link
      to={`/${post.author_x.slug}/${post.slug}`}
      onClick={() => goToPost(post)}
    >
      <p
        className="excerpt"
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      ></p>
    </Link>
  </SCFeaturedPost>
);

const SCPostListItem = styled.article`
  display: flex;
  margin: 4em 0 0 0;
  padding: 0 1em 4em 1em;
  align-items: center;
  position: relative;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px dotted gray;
  .title {
    flex: 1;
    text-align: left;
    width: 100%;
    ${media.min.medium} {
      padding-right: 2em;
    }
    h2 {
      margin-top: 0;
      margin-bottom: 0.25em;
    }
  }
  .excerpt {
    line-height: 1.4;
  }
  time {
  }
  img {
    max-width: 350px;
    ${media.max.medium} {
      max-width: 150px;
      display: none;
    }
  }
  ${media.min.large} {
    .title {
      flex: unset;
      padding-right: 0;
    }
    .image {
      display: flex;
      align-items: center;
      flex: 1;
    }
  }
`;

const PostListItem = ({ post, goToPost }: PostListItemProps) => (
  <SCPostListItem>
    <div className="title">
      <Link
        to={`/${post.author_x.slug}/${post.slug}`}
        onClick={() => goToPost(post)}
      >
        <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h2>
      </Link>
      <span>
        {' '}
        by{' '}
        <Link to={`/author/${post.author_x.slug}`}>{post.author_x.name}</Link>
        {' - '}
        <time>{moment(post.date_gmt).format('DD MMMM YYYY')}</time>
      </span>
      <Link
        to={`/${post.author_x.slug}/${post.slug}`}
        onClick={() => goToPost(post)}
      >
        <p
          className="excerpt"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        ></p>
      </Link>
    </div>
    <Link
      className="image"
      to={`/${post.author_x.slug}/${post.slug}`}
      onClick={() => goToPost(post)}
    >
      <img
        src={post.featured_img_x.thumb}
        alt={`${post.title.rendered} by ${post.author_x.name}`}
      />
    </Link>
  </SCPostListItem>
);

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
}

function PostList({ posts, setPosts, setPost, history }: PostListProps) {
  const { author } = useParams();
  const [loaded, setLoaded] = React.useState(false);

  useScrollToTop();

  const title =
    author && posts[0] ? `Author: ${posts[0].author_x.name}` : `Latest`;

  useMetaTags(
    {
      title: title + ' - Minority Report',
      openGraph: {
        title,
        image: `${window.location.protocol}//${window.location.host}${logo}`,
        site_name: 'Minority Report',
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

  const featuredPost = posts[0];

  return (
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
  );
}

export default PostList;
