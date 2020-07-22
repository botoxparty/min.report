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
import gutenbergCSS, { customGutenbergCSS } from './gutenbergCSS';
import qs from 'query-string';
//@ts-ignore
import InnerHTML from 'dangerously-set-html-content';

var ReactGA = require('react-ga');

const SCPost = styled.section`
  ${gutenbergCSS}
  min-height: 100vh;
  max-width: 1050px;
  margin: auto;
  .full-screen video {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: black !important;
  }
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

function Post({ post, setPost, history, location }: PostProps) {
  const [loaded, setLoaded] = React.useState(true);
  const [citations, setCitations] = React.useState([]);
  const { slug } = useParams();

  useScrollToTop();
  React.useEffect(() => {
    return () => setPost({});
  }, []);
  React.useEffect(() => {
    async function loadContent() {
      if (!post.id || post.slug !== slug) {
        setLoaded(false);
        const { data } = await wordpress.getPost(slug);
        setPost(data);
        setLoaded(true);
      }
      watchFootnoteScroll(setCitations);
      (window as any).prerenderReady = true;
      setTimeout(() => {
        ReactGA.pageview(history.location.pathname);
      }, 200);
    }

    async function loadPreview(id: string) {
      if (!post.id) {
        setLoaded(false);
        const { data } = await wordpress.getPostPreview(id);
        setPost(data);
        setLoaded(true);
      }
      watchFootnoteScroll(setCitations);
    }

    const search = qs.parse(location.search);

    if (search.preview_id) {
      loadPreview(search.preview_id as string);
    } else {
      loadContent();
    }
  }, [slug, location.search]);

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
        <div className='article-head'>
          <Header />
          <h1>Loading...</h1>
        </div>
      </SCPost>
    );
  }

  if (!post.id) {
    return <></>;
  }

  const isFullscreen = !!document.querySelector('.full-screen');

  return (
    <SCPost>
      {!isFullscreen && (
        <div className='article-head'>
          <Header />
          <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
          {post.author_x.slug !== 'thinktank' && (
            <p className='author'>
              {' '}
              by{' '}
              <Link to={`/author/${post.author_x.slug}`}>
                {post.author_x.name}
              </Link>
            </p>
          )}
          <time>{moment(post.date_gmt).format('DD MMMM YYYY')}</time>
        </div>
      )}
      <InnerHTML
        className='article-content gutenberg-styles'
        html={post.content.rendered}
      />
      <Footnotes citations={citations} />
    </SCPost>
  );
}

export default Post;
