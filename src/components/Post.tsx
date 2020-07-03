import * as React from 'react';
import styled from 'styled-components';
import wordpress, { WordpressPost } from '../services/wordpress';
import { useParams, Link, RouteComponentProps } from 'react-router-dom';
import Header from './Header';
import useScrollToTop from '../hooks/useScrollToTop';
import useMetaTags from 'react-metatags-hook';
import { MetaTagsConfig } from 'react-metatags-hook/dist/types';
import watchFootnoteScroll from '../hooks/watchFootnoteScroll';
import media from '../media';
import Footnotes from './Footnotes';
import moment from 'moment';
import { decode } from '../helpers/helpers';
import gutenbergCSS, { galleryCSS, customGutenbergCSS } from './gutenbergCSS';

var ReactGA = require('react-ga');

const SCPost = styled.section`
  ${gutenbergCSS}
  min-height: 100vh;
  max-width: 1050px;
  margin: auto;
  a {
    &:hover {
      color: #202267;
    }
    &:after {
      display: none;
    }
  }
  blockquote {
    p {
      line-height: 1.4;
    }
  }

  .fn-active {
    background: greenyellow !important;
  }
  .article-head {
    text-align: center;
    margin-top: 2em;
    z-index: 9999;
    position: relative;
    & > a {
      ${media.max.medium} {
        width: 150px;
        height: 150px;
      }
    }
    h1 {
      font-size: 3em;
      margin-bottom: 0.25em;
      margin-top: 0.8em;
      padding: 0 1rem;
    }
    img {
      max-width: 100%;
    }
    .author {
      margin-bottom: 1em;
      display: block;
      font-size: 1.25em;
      a {
        text-decoration: none;
      }
    }
  }
  .article-content {
    padding: 3em 1em 1em 1em;
    font-size: 1.1em;

    ${customGutenbergCSS}
  }
`;

interface PostProps extends RouteComponentProps {
  post: WordpressPost;
  setPost: Function;
}

function Post({ post, setPost, history }: PostProps) {
  const [loaded, setLoaded] = React.useState(true);
  const [citations, setCitations] = React.useState([]);
  const { slug } = useParams();

  useScrollToTop();

  React.useEffect(() => {
    async function loadContent() {
      if (!post.id || post.slug !== slug) {
        setLoaded(false);
        const { data } = await wordpress.getPost(slug);
        setPost(data);
        setLoaded(true);
      }
      watchFootnoteScroll(setCitations);
      setTimeout(() => {
        ReactGA.pageview(history.location.pathname);
      }, 200);
    }

    loadContent();
  }, [slug]);

  const metaTags: MetaTagsConfig = {
    title: decode(post.yoast_title),
    metas: post.yoast_meta,
    links: [],
    openGraph: {},
    twitter: {
      card: 'summary',
      title: 'min.report | Minority Report',
    },
  };

  useMetaTags(metaTags, [post.id]);

  if (!loaded) {
    return (
      <SCPost>
        <div className="article-head">
          <Header />
          <h1>Loading...</h1>
        </div>
      </SCPost>
    );
  }

  if (!post.id) {
    return <></>;
  }

  return (
    <SCPost>
      <div className="article-head">
        <Header />
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
        {post.author_x.slug !== 'thinktank' && (
          <p className="author">
            {' '}
            by{' '}
            <Link to={`/author/${post.author_x.slug}`}>
              {post.author_x.name}
            </Link>
          </p>
        )}
        <time>{moment(post.date_gmt).format('DD MMMM YYYY')}</time>
      </div>
      <div
        className="article-content gutenberg-styles"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      ></div>
      <Footnotes citations={citations} />
    </SCPost>
  );
}

export default Post;
