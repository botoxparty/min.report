import * as React from 'react';
import styled, { css } from 'styled-components';
import media from '../media';

const SCFootnotes = styled.div<any>`
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: white;
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.5);
  }
  border-top: 1px dotted gray;
  border-left: 1px dotted gray;
  color: #202267;
  z-index: 99999;
  padding: 1.5em;
  transform: translateY(100%);
  transition: transform 500ms;
  max-width: 100%;
  ${media.min.medium} {
    width: 500px;
  }
  .close {
    position: absolute;
    top: 1em;
    right: 1em;
  }
  h4 {
    margin-top: 0;
  }
  ${(props) =>
    props.show &&
    css`
      transform: unset;
    `}
`;

interface FootnotesProps {
  citations: Array<{
    cite: HTMLElement;
    anchor: HTMLAnchorElement;
  }>;
}

function Footnotes({ citations }: FootnotesProps) {
  const [activeNote, setActiveNote] = React.useState<number>();

  React.useEffect(() => {
    console.log('updating citation listeners', citations);
    for (let i = 0; i < citations.length; i++) {
      const note = citations[i];

      note.anchor.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNote(i);
      });
    }
  }, [citations]);

  console.log(activeNote);

  activeNote != undefined && console.log(citations[activeNote]?.cite);
  return (
    <SCFootnotes show={activeNote != undefined}>
      <h4>Notes</h4>
      <div className="close" onClick={() => setActiveNote(undefined)}>
        close
      </div>
      <div className="active-note">
        <span>[{activeNote != undefined && activeNote + 1}] </span>
        <cite
          dangerouslySetInnerHTML={{
            __html:
              activeNote != undefined
                ? citations[activeNote]?.cite.innerHTML
                : '',
          }}
        ></cite>
      </div>
      <p>{citations.map((x, i: number) => i + 1).join(', ')}</p>
    </SCFootnotes>
  );
}

export default Footnotes;
