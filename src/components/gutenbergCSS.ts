import { css } from 'styled-components';
import media from '../media';

export default css`
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }
  body {
    margin: 0;
  }
  main {
    display: block;
  }
  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }
  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }
  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  a {
    background-color: transparent;
  }
  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }
  b,
  strong {
    font-weight: bolder;
  }
  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  img {
    border-style: none;
    object-fit: contain;
    ${media.max.tablet} {
      height: 100%;
    }
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
  button,
  input {
    overflow: visible;
  }
  button,
  select {
    text-transform: none;
  }
  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }
  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  button:-moz-focusring,
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }
  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }
  progress {
    vertical-align: baseline;
  }
  textarea {
    overflow: auto;
  }
  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }
  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }
  [type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }
  details {
    display: block;
  }
  summary {
    display: list-item;
  }
  template {
    display: none;
  }
  [hidden] {
    display: none;
  }
  * {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after,
  p:first-letter,
  div:first-letter,
  blockquote:first-letter,
  li:first-letter,
  p:first-line,
  div:first-line,
  blockquote:first-line,
  li:first-line {
    background: transparent !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }
  html {
    font-size: 16px;
    margin: 0;
    padding: 0;
  }
  body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background: #fff !important;
    color: #000 !important;
    font-size: 1rem;
    line-height: 1.5;
    margin: 0 auto;
    text-rendering: optimizeLegibility;
  }
  p,
  blockquote,
  table,
  ul,
  ol,
  dl {
    margin-bottom: 1.5rem;
    margin-top: 0;
  }
  p:last-child,
  ul:last-child,
  ol:last-child {
    margin-bottom: 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #000;
    line-height: 1.2;
    margin-bottom: 0.75rem;
    margin-top: 0;
  }
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.75rem;
  }
  h4 {
    font-size: 1.5rem;
  }
  h5 {
    font-size: 1.25rem;
  }
  h6 {
    font-size: 1rem;
  }
  a,
  a:visited {
    color: #000;
    text-decoration: underline;
    word-wrap: break-word;
  }
  table {
    border-collapse: collapse;
  }
  thead {
    display: table-header-group;
  }
  table,
  th,
  td {
    border-bottom: 1px solid #000;
  }
  td,
  th {
    padding: 8px 16px;
    page-break-inside: avoid;
  }
  code,
  pre,
  kbd {
    border: 1px solid #bbb;
    font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
    font-size: 85%;
  }
  code,
  kbd {
    padding: 3px;
  }
  pre {
    margin-bottom: 1.5rem;
    padding: 10px 12px;
  }
  pre code,
  pre kbd {
    border: 0;
  }
  ::-webkit-input-placeholder {
    color: transparent;
  }
  :-moz-placeholder {
    color: transparent;
  }
  ::-moz-placeholder {
    color: transparent;
  }
  :-ms-input-placeholder {
    color: transparent;
  }
  blockquote {
    border: 0;
    border-left: 5px solid #bbb;
    margin-left: 1px;
    padding: 12px 1.5rem;
  }
  [dir='rtl'] blockquote {
    border-left: 0;
    border-right: 5px solid #bbb;
    margin-left: 0;
    margin-right: 1px;
  }
  blockquote:first-child {
    margin-top: 0;
  }
  blockquote p:last-child,
  blockquote ul:last-child,
  blockquote ol:last-child {
    margin-bottom: 0;
  }
  blockquote footer {
    display: block;
    font-size: 80%;
  }
  img {
    border: 0;
    display: block;
    max-width: 100% !important;
    vertical-align: middle;
  }
  hr {
    border: 0;
    border-bottom: 2px solid #bbb;
    height: 0;
    margin: 2.25rem 0;
    padding: 0;
  }
  dt {
    font-weight: bold;
  }
  dd {
    margin: 0;
    margin-bottom: 0.75rem;
  }
  abbr[title],
  acronym[title] {
    border: 0;
    text-decoration: none;
  }
  table,
  blockquote,
  pre,
  code,
  figure,
  li,
  hr,
  ul,
  ol,
  a,
  tr {
    page-break-inside: avoid;
  }
  h2,
  h3,
  h4,
  p,
  a {
    orphans: 3;
    widows: 3;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    page-break-after: avoid;
    page-break-inside: avoid;
  }
  h1 + p,
  h2 + p,
  h3 + p {
    page-break-before: avoid;
  }
  img {
    page-break-after: auto;
    page-break-before: auto;
    page-break-inside: avoid;
  }
  pre {
    white-space: pre-wrap !important;
    word-wrap: break-word;
  }
  body {
    padding-bottom: 2.54cm;
    padding-left: 1.8cm;
    padding-right: 1.8cm;
    padding-top: 2.54cm;
  }
  a[href^='http']:after,
  a[href^='ftp']:after {
    content: ' (' attr(href) ')';
    font-size: 80%;
  }
  a[href$='.jpg']:after,
  a[href$='.jpeg']:after,
  a[href$='.gif']:after,
  a[href$='.png']:after {
    display: none;
  }
  abbr[title]:after,
  acronym[title]:after {
    content: ' (' attr(title) ')';
  }
  .page-break,
  .page-break-before {
    page-break-before: always;
  }
  .page-break-after {
    page-break-after: always;
  }
  .no-print {
    display: none;
  }
  a.no-reformat:after {
    content: '';
  }
  abbr[title].no-reformat:after,
  acronym[title].no-reformat:after {
    content: '';
  }
  .no-reformat abbr:after,
  .no-reformat acronym:after,
  .no-reformat a:after {
    content: '';
  }
`;

const videoPlayerCSS = css`
  figure.wp-block-embed.is-type-video {
    padding-bottom: 1rem;
    ${media.max.large} {
      margin: 0;
    }
    figcaption {
      margin-top: 1rem;
    }
    .wp-block-embed__wrapper {
      position: relative;
      overflow: hidden;
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }
    }
    &.wp-embed-aspect-16-9 {
      .wp-block-embed__wrapper {
        padding-top: 56.25%;
      }
    }
    &.wp-embed-aspect-4-3 {
      .wp-block-embed__wrapper {
        padding-top: 71.25%;
      }
    }
  }
`;

export const citationCSS = css`
  .wp-block-quote.is-style-large {
    font-size: 1.6em;
    font-style: italic;
    margin-top: -1em;
    padding-bottom: 1em;
    padding-top: 0;
    p {
      margin-bottom: 1em;
    }
    cite {
      text-align: right;
      display: block;
      font-size: 0.7em;
      margin-top: 0.5em;
    }
  }

  /* Hide citation on regular style for footnotes feature */
  p cite,
  blockquote:not(.is-style-large) cite {
    display: none;
  }

  > p {
    line-height: 1.4;
    margin-bottom: 3.25rem;
    position: relative;
    z-index: 99;
    + blockquote {
      margin-top: -3.1em;
      padding-left: 4em;
      border: 0;
      color: #202267;
      margin-bottom: 0;
      p {
        margin-bottom: 0;
        display: inline;
      }
      ${media.max.medium} {
        padding: 1.5em;
        margin-right: 0;
      }
    }
  }

  .wp-block-lazyblock-footnotes {
    font-size: 0.75em;
  }
`;

export const embedsCSS = css`
  .wp-block-embed-instagram.aligncenter {
    blockquote {
      margin: auto !important;
    }
  }
`;
export const imagesCSS = css`
  .wp-block-image {
    margin-bottom: 3.25em;
    ${media.min.large} {
      figure.alignleft {
        display: inline;
        float: left;
        max-width: 500px;
      }
      figure.alignright {
        display: inline;
        float: right;
        max-width: 500px;
      }
    }
    figure.aligncenter {
      display: flex;
      justify-content: center;
      ${media.max.tablet} {
        width: calc(100% + 2em);
        margin-left: -1em;
      }
    }
  }
`;

export const galleryCSS = css`
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
    &:hover {
      transform: perspective(600px) rotateY(0);
      z-index: 99999;
      img {
        box-shadow: 10px 5px 80px 13px rgba(255, 255, 255, 0.5) !important;
      }
    }
  }
`;

export const customGutenbergCSS = css`
  .has-text-align-center {
    text-align: center;
  }
  h2 {
    font-size: 2rem;
    clear: both;
    margin-bottom: 2.25rem;
    border-bottom: 2px solid;
    padding-bottom: 1rem;
    padding-top: 1rem;
  }
  pre {
    line-height: 1.4;
    border: 0;
    position: relative;
  }
  ${embedsCSS}
  ${videoPlayerCSS}
  ${imagesCSS}
  ${galleryCSS}
  ${citationCSS}
`;
