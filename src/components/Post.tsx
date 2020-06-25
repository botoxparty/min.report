import * as React from 'react';
import styled from 'styled-components';
import wordpress, { WordpressPost } from '../services/wordpress';
import { useParams, Link } from 'react-router-dom';
import Header from './Header';

const SCPost = styled.section`
  min-height: 100vh;
  max-width: 1050px;
  margin: auto;
  .article-head {
    text-align: center;
    margin-top: 2em;
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
    p {
      line-height: 1.4;
      margin-bottom: 3.25em;
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
      &:before {
        content: '”';
        display: block;
        position: absolute;
        left: 0;
        font-size: 3em;
        font-weight: bold;
      }
    }
  }
`;

function Post() {
  const [post, setPost] = React.useState({} as WordpressPost);
  const [loaded, setLoaded] = React.useState(false);
  const contentRef = React.useRef(null);
  const { slug } = useParams();

  React.useEffect(() => {
    console.log(contentRef.current);
    console.log(document.querySelectorAll('a'));
  }, [post]);

  React.useEffect(() => {
    async function loadContent() {
      const { data } = await wordpress.getPost(slug);
      setPost(data);
      setLoaded(true);
    }

    loadContent();
  }, [slug]);

  if (!loaded) {
    return <h1>Loading...</h1>;
  }
  if (contentRef) {
    console.log('contentref', contentRef.current);
  } else {
    console.log('no ref');
  }

  setTimeout(() => {
    const contentBody = document.querySelector('.article-content');
    const arrayoflinks = Array.from(
      contentBody ? contentBody.querySelectorAll('a') : []
    ).filter((lnk: HTMLAnchorElement) => lnk.href.startsWith('applewebdata'));

    console.log(arrayoflinks);

    for (let i = 0; i < arrayoflinks.length; i++) {
      const curr = arrayoflinks[i];
      const matching = curr.href.includes('ftnref')
        ? contentBody?.querySelector(
            `a[href="${curr.href.replace('ftnref', 'ftn')}"]`
          )
        : contentBody?.querySelector(
            `a[href="${curr.href.replace('ftn', 'ftnref')}"]`
          );

      curr.addEventListener('click', (e) => {
        e.preventDefault();
        if (!matching) {
          return;
        }
        const yOffset = -30;
        const y =
          matching.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });

        matching.classList.add('fn-active');
        curr.classList.add('fn-active');
      });

      curr.addEventListener('blur', (e) => {
        e.preventDefault();
        console.log('blurred');
        arrayoflinks.forEach((link) => link.classList.remove('fn-active'));
      });
      console.log(curr, matching);
    }
  }, 50);

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
