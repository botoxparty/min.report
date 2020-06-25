import * as React from 'react';
import styled from 'styled-components';
import wordpress, { WordpressPost } from '../services/wordpress';
import Header from './Header';
import media from '../media';
import { RouteComponentProps, Link, useParams } from 'react-router-dom';

const SCPostList = styled.section`
  max-width: 1050px;
  margin: auto;
  min-height: 100vh;
`;

interface PostListProps extends RouteComponentProps {
  title?: string;
  author?: boolean;
}

interface PostListItemProps {
  post: WordpressPost;
}

const SCFeaturedPost = styled.article`
  border-bottom: 1px dotted grey;
  margin-top: 2em;
  padding-bottom: 2em;
  .site-header-featured-post {
    display: flex;
    align-items: center;
    ${media.max.medium} {
      flex-direction: column;
    }
    img {
      max-width: 100%;
    }
  }
  .header-wrapper {
    padding: 0 2em;
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
  }
  .excerpt {
    padding: 0 1em;
    line-height: 1.4;
    font-size: 1.25em;
  }
`;

const FeaturedPost = ({ post }: PostListItemProps) => (
  <SCFeaturedPost>
    <div className="site-header-featured-post">
      <div className="header-wrapper">
        <Header />
        <div>
          <Link to={`/${post.slug}`}>
            <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
          </Link>
          <span className="author">
            by{' '}
            <Link to={`author/${post.author_x.slug}`}>
              {post.author_x.name}
            </Link>
          </span>
        </div>
      </div>
      <Link to={`/${post.slug}`}>
        <img
          src={post.featured_img_x.thumb}
          alt={`${post.title.rendered} by ${post.author_x.name}`}
        />
      </Link>
    </div>
    <Link to={`/${post.slug}`}>
      <p
        className="excerpt"
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      ></p>
    </Link>
  </SCFeaturedPost>
);

const SCPostListItem = styled.article`
  display: flex;
  margin: 4em 0;
  padding: 0 1em 4em 1em;
  border-bottom: 1px dotted gray;
  align-items: center;
  .title {
    flex: 1;
    text-align: left;
    padding-right: 1em;
    h2 {
      margin-bottom: 0.25em;
    }
  }
  .excerpt {
    line-height: 1.4;
  }
  img {
    max-width: 350px;
    ${media.max.medium} {
      max-width: 150px;
    }
  }
`;

const PostListItem = ({ post }: PostListItemProps) => (
  <SCPostListItem>
    <div className="title">
      <Link to={`/${post.slug}`}>
        <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h2>
      </Link>
      <span>
        {' '}
        by <Link to={`author/${post.author_x.slug}`}>{post.author_x.name}</Link>
      </span>
      <Link to={`/${post.slug}`}>
        <p
          className="excerpt"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        ></p>
      </Link>
    </div>
    <Link to={`/${post.slug}`}>
      <img
        src={post.featured_img_x.thumb}
        alt={`${post.title.rendered} by ${post.author_x.name}`}
      />
    </Link>
  </SCPostListItem>
);

const SCAuthorTitle = styled.div`
  text-align: center;
  margin-top: 2em;
  h1 {
    font-size: 3em;
    margin-bottom: 0.25em;
  }
`;

function PostList({ title }: PostListProps) {
  const [posts, setPosts] = React.useState([] as Array<WordpressPost>);

  const { author } = useParams();

  React.useEffect(() => {
    async function loadContent() {
      if (author) {
        const { data } = await wordpress.getPostsByAuthor(author);
        setPosts(data);
      } else {
        const { data } = await wordpress.getPosts();
        setPosts(data);
      }
    }

    loadContent();
  }, [author]);

  return (
    <SCPostList>
      {author && posts.length > 0 && (
        <>
          <SCAuthorTitle>
            <Header />
            <h1>{posts[0].author_x.name}</h1>
          </SCAuthorTitle>
        </>
      )}
      {posts.map((post, index) =>
        index === 0 && !author ? (
          <FeaturedPost key={post.id} post={post} />
        ) : (
          <PostListItem key={post.id} post={post}></PostListItem>
        )
      )}
    </SCPostList>
  );
}

export default PostList;
