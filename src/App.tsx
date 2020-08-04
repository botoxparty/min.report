import React from 'react';
import PostList from './components/PostList';
import Footer from './components/Footer';
import { Route, Switch } from 'react-router-dom';
import Post from './components/Post';
import wordpress, { WordpressPost } from './services/wordpress';
import Marquee from './components/Marquee';
import styled from 'styled-components';
import media from './media';
import Error from './components/Error';
import MailingListSignup from './components/MailingListSignup';

const PageBottomMargin = styled.div`
  height: 10em;
`;

const Main = styled.main`
  ${media.max.tablet} {
    padding-top: 52px;
  }
  padding-top: 34px;
`;

function App() {
  const [currentPost, setCurrentPost] = React.useState();
  const [posts, setPosts] = React.useState([] as Array<WordpressPost>);
  const [authorPosts, setAuthorPosts] = React.useState(
    [] as Array<WordpressPost>
  );

  React.useEffect(() => {
    async function loadContent() {
      const { data } = await wordpress.getPosts();
      setPosts(data);
    }

    loadContent();
  }, []);

  return (
    <Main>
      <Route
        path='/'
        render={(props) => <Marquee currentPost={currentPost} {...props} />}
      ></Route>
      <Switch>
        <Route
          exact
          path='/'
          render={(props) => (
            <PostList
              setPosts={setPosts}
              posts={posts}
              {...props}
              setPost={setCurrentPost}
            />
          )}
        />
        <Route
          exact
          path='/author/:author'
          render={(props) => (
            <PostList
              {...props}
              setPost={setCurrentPost}
              setPosts={setAuthorPosts}
              posts={authorPosts}
            />
          )}
        />
        <Route
          exact
          path='/:author/:slug'
          render={(props) => (
            <Post {...props} post={currentPost} setPost={setCurrentPost} />
          )}
        />
        <Route exact path='/404' render={(props) => <Error {...props} />} />
      </Switch>
      <PageBottomMargin />
      <MailingListSignup />
      <Footer />
    </Main>
  );
}

export default App;
