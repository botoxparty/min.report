import * as React from 'react';
import styled from 'styled-components';
import wordpress, { WordpressPost } from '../services/wordpress';
import { useParams, Link, RouteComponentProps } from 'react-router-dom';
import useScrollToTop from '../hooks/useScrollToTop';
import useMetaTags from 'react-metatags-hook';
import { MetaTagsConfig } from 'react-metatags-hook/dist/types';
import watchFootnoteScroll from '../hooks/watchFootnoteScroll';
import Footnotes from './Footnotes';
import { decode, formatDate } from '../helpers/helpers';
import gutenbergCSS, { customGutenbergCSS } from './gutenbergCSS';
import qs from 'query-string';
//@ts-ignore
import InnerHTML from 'dangerously-set-html-content';
import ArticleHead from './ArticleHead';
import Footer from './Footer';

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
    /* position: fixed; */
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

  .article-content {
    padding: 3em 1em 1em 1em;
    font-size: 1.1em;

    ${customGutenbergCSS}
  }
`;

interface PostProps extends RouteComponentProps {
  post?: WordpressPost;
  setPost: Function;
}

function Post({ post, setPost, history, location }: PostProps) {
  const [, setLoaded] = React.useState(true);
  const [citations, setCitations] = React.useState([]);
  const { slug } = useParams();

  useScrollToTop();
  React.useEffect(() => {
    return () => setPost(null);
  }, []);
  React.useEffect(() => {
    async function loadContent() {
      if (!post || post.slug !== slug) {
        setLoaded(false);
        try {
          const { data } = await wordpress.getPost(slug);
          setPost(data);
          setLoaded(true);
        } catch (e) {
          console.log(e.response.status);
          const { status } = e.response;
          if (status === 404) {
            history.push('/404');
          } else {
            history.push('/500');
          }
        }
      }
      watchFootnoteScroll(setCitations);
      (window as any).prerenderReady = true;
      setTimeout(() => {
        ReactGA.pageview(history.location.pathname);
      }, 200);
    }

    async function loadPreview(id: string) {
      if (!post) {
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

  const metaTags: MetaTagsConfig = post
    ? {
        title: decode(post.yoast_title) + ' - min.report',
        metas: post.yoast_meta,
        links: [],
        openGraph: {},
        twitter: {
          card: 'summary',
          title: 'min.report | Minority Report',
        },
      }
    : {};

  useMetaTags(metaTags, [post]);

  if (!post) {
    return <></>;
  }

  const isFullscreen = !!document.querySelector('.full-screen');

  return (
    <>
      <SCPost>
        {!isFullscreen && (
          <ArticleHead
            title={
              <h1
                dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
              ></h1>
            }
          >
            {post.author_x.slug !== 'thinktank' && (
              <p className='author'>
                {' '}
                by{' '}
                <Link to={`/author/${post.author_x.slug}`}>
                  {post.author_x.name}
                </Link>
              </p>
            )}
            <time>{formatDate(post.date_gmt)}</time>
          </ArticleHead>
        )}
        <InnerHTML
          className='article-content gutenberg-styles'
          html={post.content.rendered}
        />
        <Footnotes citations={citations} />
      </SCPost>
      <Footer />
    </>
  );
}

export default Post;
