import * as React from 'react';
import styled from 'styled-components';
import wordpress, { WordpressPost } from '../services/wordpress';
import { useParams, Link } from 'react-router-dom';
import Header from './Header';
import useScrollToTop from '../hooks/useScrollToTop';
import useMetaTags, { resetMetaTags } from 'react-metatags-hook';
import { MetaTagsConfig } from 'react-metatags-hook/dist/types';
import watchFootnoteScroll from '../hooks/watchFootnoteScroll';

const SCPost = styled.section`
  min-height: 100vh;
  max-width: 1050px;
  margin: auto;
  .article-head {
    text-align: center;
    margin-top: 2em;
    z-index: 9999;
    position: relative;
    h1 {
      font-size: 3em;
      margin-bottom: 0.25em;
    }
    img {
      max-width: 100%;
    }
  }
  .article-content {
    padding: 1em;
    font-size: 1.25em;
    .fn-active {
      background: greenyellow !important;
    }
    .wp-block-lazyblock-footnotes {
      font-size: 0.75em;
    }
    .wp-block-getwid-images-slider__item {
      transition: transform 500ms;
      position: relative;
      &:nth-child(odd) {
        transform: perspective(600px) rotateY(45deg);
      }
      &:nth-child(even) {
        transform: perspective(600px) rotateY(-45deg);
      }
      &:hover {
        transform: perspective(600px) rotateY(0);
        z-index: 99999;
      }
    }
    p {
      line-height: 1.4;
      margin-bottom: 3.25em;
      position: relative;
      z-index: 99;
      + blockquote {
        margin-top: -2.25em;
      }
    }
    .wp-block-image {
      margin-bottom: 3.25em;
    }
    pre {
      line-height: 1.4;
      border: 0;
      position: relative;
      /* &:before {
        content: '”';
        display: block;
        position: absolute;
        left: 0;
        font-size: 3em;
        font-weight: bold;
      } */
    }
  }
`;

interface PostProps {
  post: WordpressPost;
  setPost: Function;
}

function Post({ post, setPost }: PostProps) {
  const [loaded, setLoaded] = React.useState(true);
  const contentRef = React.useRef(null);
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
    }

    loadContent();
  }, [slug]);

  const metaTags: MetaTagsConfig = {
    title: post.yoast_title,
    metas: [],
    links: [],
    openGraph: {},
    twitter: {},
  };

  resetMetaTags();
  metaTags.metas = post.yoast_meta;
  useMetaTags(metaTags);

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

  watchFootnoteScroll();

  if (!post.id) {
    return <></>;
  }

  return (
    <SCPost>
      <div className="article-head">
        <Header />
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
        <span ref={contentRef}>
          {' '}
          by{' '}
          <Link to={`author/${post.author_x.slug}`}>{post.author_x.name}</Link>
        </span>
      </div>
      <div
        className="article-content gutenberg-styles"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      ></div>
    </SCPost>
  );
}

export default Post;
