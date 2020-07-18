import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import * as React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
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
  }
  .side-b {
    transform: rotateX(-90deg) rotateY(0deg) translateZ(20px);
    background: white;
    border-bottom: 1px solid black;
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
      }
    }
    .post-title {
      flex: 1;
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

  useScrollPosition(
    ({ prevPos, currPos }) => {
      let height = 0;

      const articleHead = document
        .querySelector('.article-head')
        ?.getBoundingClientRect();

      if (articleHead) height += articleHead.height + articleHead.y;

      if (height - 100 < 0) {
        setShowOnScroll(true);
      } else {
        setShowOnScroll(false);
      }
    },
    [showOnScroll, history.location.pathname]
  );

  return (
    <SCMarquee flip={showOnScroll}>
      <Disclaimer className='side-a' role='alert'>
        Some people may find the contents challenging as they reference adult
        themes. Viewer discretion is advised.
      </Disclaimer>
      <div className='side-b'>
        <div className='contents'>
          {currentPost.id && (
            <div className='post-title'>
              <h1
                dangerouslySetInnerHTML={{ __html: currentPost.title.rendered }}
              ></h1>
              <Link to={`/author/${currentPost.author_x.slug}`}>
                {currentPost.author_x.name}
              </Link>
            </div>
          )}
          <Link className='logo' to='/'>
            min.report
          </Link>
        </div>
      </div>
    </SCMarquee>
  );
}

export default Marquee;
