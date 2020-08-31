import { WordpressPost } from '../../services/wordpress';
import styled from 'styled-components';
import media from '../../media';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../helpers/helpers';

export interface PostListItemProps {
  post: WordpressPost;
  goToPost: Function;
}

const SCPostListItem = styled.article`
  display: flex;
  margin: 4em 0 0 0;
  padding: 0 1em 4em 1em;
  align-items: center;
  position: relative;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px dotted gray;
  .title {
    flex: 1;
    text-align: left;
    width: 100%;
    ${media.min.medium} {
      padding-right: 2em;
    }
    h2 {
      margin-top: 0;
      margin-bottom: 0.25em;
    }
  }
  .excerpt {
    line-height: 1.4;
  }
  time {
  }
  img {
    max-width: 350px;
    ${media.max.medium} {
      max-width: 150px;
      display: none;
    }
  }
  ${media.min.large} {
    .title {
      flex: unset;
      padding-right: 0;
    }
    .image {
      display: flex;
      align-items: center;
      flex: 1;
    }
  }
`;

const PostListItem = ({ post, goToPost }: PostListItemProps) => (
  <SCPostListItem>
    <div className='title'>
      <Link
        to={`/${post.author_x.slug}/${post.slug}`}
        onClick={() => goToPost(post)}
      >
        <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h2>
      </Link>
      <span>
        {post.author_x.slug !== 'thinktank' && (
          <>
            {' '}
            by{' '}
            <Link to={`/author/${post.author_x.slug}`}>
              {post.author_x.name}
            </Link>
            {' - '}
          </>
        )}
        <time dateTime={post.date_gmt.split('T')[0]}>
          {formatDate(post.date_gmt)}
        </time>
      </span>
      <Link
        to={`/${post.author_x.slug}/${post.slug}`}
        onClick={() => goToPost(post)}
      >
        <p
          className='excerpt'
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        ></p>
      </Link>
    </div>
    <Link
      className='image'
      to={`/${post.author_x.slug}/${post.slug}`}
      onClick={() => goToPost(post)}
    >
      <img
        src={post.featured_img_x.thumb}
        alt={`${post.title.rendered} by ${post.author_x.name}`}
      />
    </Link>
  </SCPostListItem>
);

export default PostListItem;
