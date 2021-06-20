import styled from 'styled-components';
import media from '../../media';
import React from 'react';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import { formatDate } from '../../helpers/helpers';
import { PostListItemProps } from './PostListItem';
import Coauthors from '../Coauthors';


const SCFeaturedPost = styled.article`
  border-bottom: 1px dotted grey;
  margin-top: 2em;
  padding-bottom: 2em;
  .site-header-featured-post {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 1em;
    ${media.max.medium} {
      flex-direction: column;
    }
    a {
      ${media.min.medium} {
        max-width: 80%;
        min-width: 40%;
      }
    }
    img {
      ${media.max.medium} {
        width: calc(100% + 2em);
        margin-left: -1em;
      }

      ${media.min.medium} {
        max-width: 100%;
        object-fit: cover;
        height: 100%;
      }
    }
  }
  .header-wrapper {
    ${media.min.medium} {
      padding-right: 2em;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    h1 {
      font-size: 3em;
      margin-bottom: 0.25em;
      margin-top: 2rem;
    }
    .author {
      margin-bottom: 1em;
      display: block;
      font-size: 1.25em;
    }
    time {
      display: block;
      margin-bottom: 1em;
    }
  }
  .excerpt {
    padding: 0 1em;
    line-height: 1.4;
    font-size: 1.25em;
  }
`;



const FeaturedPost = ({ post, goToPost }: PostListItemProps) => (
  <SCFeaturedPost>
    <div className='site-header-featured-post'>
      <div className='header-wrapper'>
        <Logo link={post.permalink} />
        <div>
          <Link
            to={post.permalink}
            onClick={() => goToPost(post)}
          >
            <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
          </Link>
          {post.author_x.slug !== 'thinktank' && (
            <span className='author'>
              by{' '}<Coauthors coauthors={post.coauthors} />
            </span>
          )}
          <time dateTime={post.date_gmt.split('T')[0]}>
            {formatDate(post.date_gmt)}
          </time>
        </div>
      </div>
      <Link
        to={post.permalink}
        onClick={() => goToPost(post)}
      >
        <img
          src={post.featured_img_x.thumb}
          alt={`${post.title.rendered}`}
        />
      </Link>
    </div>
    <Link
      to={post.permalink}
      onClick={() => goToPost(post)}
    >
      <p
        className='excerpt'
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      ></p>
    </Link>
  </SCFeaturedPost>
);

export default FeaturedPost;
