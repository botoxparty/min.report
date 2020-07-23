import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import * as React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/MinorityReport_Logo.png';
import useWindowSize from '../hooks/useWindowResize';

const SCMarquee = styled.header<any>`
  top: 0;
  position: fixed;
  z-index: 9999999;
  width: 100%;
  margin: auto;
  .side-a,
  .side-b {
    width: 100%;
    position: absolute;
    backface-visibility: hidden;
    transform-origin: 50% 50% 0px;
    transition: all 500ms ease-in-out;
    padding: 0.5em 1rem;
    height: auto;
    top: 0;
  }
  .side-a {
    transform: rotateX(0deg) rotateY(0deg) translateZ(20px);
    z-index: 1;
    min-height: 49px;
  }
  .side-b {
    transform: rotateX(-90deg) rotateY(0deg) translateZ(20px);
    background: white;
    border-bottom: 1px dotted gray;
    display: flex;
    align-items: center;
    .contents {
      display: flex;
      max-width: 1050px;
      width: 100%;
      margin: auto;
      a.logo {
        display: flex;
        align-items: center;
        padding-left: 1em;
        img {
          max-height: 32px;
          max-width: 32px;
          margin-left: 0.5em;
        }
      }
    }
    .post-title {
      flex: 1;
      text-align: right;
      h1 {
        margin: 0;
        padding: 0;
        font-size: 1.25rem;
      }
    }
  }
  ${(props) =>
    props.flip &&
    css`
      .side-a {
        transform: rotateX(90deg) rotateY(0deg) translateZ(20px);
      }
      .side-b {
        transform: rotateX(0deg) rotateY(0deg) translateZ(20px);
        z-index: 1;
      }
    `}
`;

const Disclaimer = styled.div`
  background-color: #fff8dc;
  padding: 0.25em;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Marquee({ currentPost, history }: any) {
  const [showOnScroll, setShowOnScroll] = React.useState(false);
  const marqueeRef = React.useRef(null);

  useScrollPosition(() => {
    let height = 0;

    const articleHead = document
      .querySelector('.article-head')
      ?.getBoundingClientRect();

    const featuredPost = document
      .querySelector('.site-header-featured-post')
      ?.getBoundingClientRect();

    if (articleHead) height += articleHead.height + articleHead.y;
    else if (featuredPost) height += featuredPost.height + featuredPost.y;

    if (height - 100 < 0) {
      setShowOnScroll(true);
    } else {
      setShowOnScroll(false);
    }
  }, [showOnScroll, history.location.pathname]);

  function getMarqueeHeight() {
    const current = marqueeRef.current;

    if (current) {
      const sideA: HTMLElement = current['children'][0];
      const sideB: HTMLElement = current['children'][1];

      const marqueeHeight = showOnScroll
        ? sideB.offsetHeight
        : sideA.offsetHeight;

      document.documentElement.style.setProperty(
        '--marquee-height',
        marqueeHeight + 'px'
      );
    }
  }

  useWindowSize(getMarqueeHeight);

  const isFullscreen = !!document.querySelector('.full-screen');

  return (
    <SCMarquee ref={marqueeRef} flip={showOnScroll || isFullscreen}>
      <Disclaimer className='side-a' role='alert'>
        Some people may find the contents challenging as they reference adult
        themes. Viewer discretion is advised.
      </Disclaimer>
      <div className='side-b'>
        <div className='contents'>
          <Link className='logo' to='/'>
            min.report
            <img src={logo} alt='Minority Report Crest by Hana Earles' />
          </Link>
          {currentPost?.id && (
            <div className='post-title'>
              <h1
                dangerouslySetInnerHTML={{ __html: currentPost.title.rendered }}
              ></h1>
              <Link to={`/author/${currentPost.author_x.slug}`}>
                {currentPost.author_x.name}
              </Link>
            </div>
          )}
        </div>
      </div>
    </SCMarquee>
  );
}

export default Marquee;
