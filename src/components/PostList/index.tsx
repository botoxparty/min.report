import * as React from 'react';
import styled from 'styled-components';
import { WordpressPost } from '../../services/wordpress';
import media from '../../media';
import PostListItem from './PostListItem';

const SCPostList = styled.section`
  max-width: 1050px;
  margin: auto;
  min-height: 100vh;
`;


const SCOlderPosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  article {
    box-sizing: border-box;
    ${media.min.large} {
      flex-direction: column;
      width: 50%;
    }
  }
`;
interface PostListProps {
  setPost: Function;
  posts: Array<WordpressPost>;
}

function PostList({
  posts,
  setPost,
}: PostListProps) {

  const goToPost = (post: WordpressPost) => {
    setPost(post);
  };

  // const query = qs.parse(location.search);
  // if (query.preview) {
  //   return <Redirect to={`preview/preview/?preview_id=${query.p}`}></Redirect>;
  // }


  return (
    <>
      <SCPostList>
        <SCOlderPosts>
          {posts.map((post) =>
              <PostListItem
                key={post.id}
                post={post}
                goToPost={goToPost}
              ></PostListItem>
          )}
        </SCOlderPosts>
      </SCPostList>
    </>
  );
}

export default PostList;
