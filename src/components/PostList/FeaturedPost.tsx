import styled from 'styled-components';
import media from '../../media';
import React from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import { formatDate } from '../../helpers/helpers';
import { PostListItemProps } from './PostListItem';

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
        <Header />
        <div>
          <Link
            to={`/${post.author_x.slug}/${post.slug}`}
            onClick={() => goToPost(post)}
          >
            <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
          </Link>
          {post.author_x.slug !== 'thinktank' && (
            <span className='author'>
              by{' '}
              <Link to={`/author/${post.author_x.slug}`}>
                {post.author_x.name}
              </Link>
            </span>
          )}
          <time dateTime={post.date_gmt.split('T')[0]}>
            {formatDate(post.date_gmt)}
          </time>
        </div>
      </div>
      <Link
        to={`/${post.author_x.slug}/${post.slug}`}
        onClick={() => goToPost(post)}
      >
        <img
          src={post.featured_img_x.thumb}
          alt={`${post.title.rendered} by ${post.author_x.name}`}
        />
      </Link>
    </div>
    <Link
      to={`/${post.author_x.slug}/${post.slug}`}
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
