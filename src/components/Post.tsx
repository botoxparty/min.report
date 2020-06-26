import * as React from 'react';
import styled from 'styled-components';
import wordpress, { WordpressPost } from '../services/wordpress';
import { useParams, Link } from 'react-router-dom';
import Header from './Header';
import useScrollToTop from '../hooks/useScrollToTop';
import useMetaTags, { resetMetaTags } from 'react-metatags-hook';
import { MetaTagsConfig } from 'react-metatags-hook/dist/types';
import watchFootnoteScroll from '../hooks/watchFootnoteScroll';
import media from '../media';
import Footnotes from './Footnotes';
import moment from 'moment';
const SCPost = styled.section`
  min-height: 100vh;
  max-width: 1050px;
  margin: auto;
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
      padding: 0 1rem;
    }
    img {
      max-width: 100%;
    }
    .author {
      margin-bottom: 1em;
      display: block;
      font-size: 1.25em;
    }
  }
  .article-content {
    padding: 1em;
    font-size: 1.1em;

    figure.aligncenter {
      ${media.max.tablet} {
        width: calc(100% + 2em);
        margin-left: -1em;
      }
    }

    .wp-block-lazyblock-footnotes {
      font-size: 0.75em;
    }
    .wp-block-getwid-images-slider__item {
      transition: transform 500ms;
      position: relative;
      figcaption {
        background: white !important;
        padding: 0.15em 0.5em;
        display: inline-block;
      }
      &:nth-child(odd) {
        transform: perspective(600px) rotateY(45deg);
      }
      &:nth-child(even) {
        transform: perspective(600px) rotateY(-45deg);
      }
      &:first-of-type {
        transform: perspective(300px) rotateX(45deg);
      }
      /* &:nth-of-type(4) {
        transform: perspective(600px) rotate(45deg) translateY(-20%)
          translateZ(-200px);
      }
      &:nth-of-type(5) {
        transform: perspective(600px) rotateY(42deg) rotateX(40deg)
          translateX(-50%);
      } */
      &:hover {
        transform: perspective(600px) rotateY(0);
        z-index: 99999;
        img {
          box-shadow: 10px 5px 80px 13px rgba(255, 255, 255, 0.5) !important;
        }
      }
    }
    cite {
      display: none;
    }
    > p {
      line-height: 1.4;
      margin-bottom: 3.25em;
      position: relative;
      z-index: 99;
      + blockquote {
        margin-top: -3.3em;
        padding-left: 4em;
        border: 0;
        color: #202267;
        margin-bottom: 0.3em;
        p {
          margin-bottom: 0;
        }
        ${media.max.medium} {
          padding-left: 2.5em;
        }
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

  if (!post.id) {
    return <></>;
  }

  return (
    <SCPost>
      <div className="article-head">
        <Header />
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
        <p className="author">
          {' '}
          by{' '}
          <Link to={`/author/${post.author_x.slug}`}>{post.author_x.name}</Link>
        </p>
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
