import React from 'react';
import PostList from './components/PostList/index';
import Footer from './components/Footer';
import { Route, Switch } from 'react-router-dom';
import Post from './components/Post';
import wordpress, { WordpressPost } from './services/wordpress';
import Marquee from './components/Marquee';
import styled from 'styled-components';
import media from './media';
import Error from './components/Error';
import MailingListSignup from './components/MailingListSignup';
import Homepage from './components/Homepage';
import Author from './components/Author';

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
  const [pageCount, setPageCount] = React.useState(1);

  React.useEffect(() => {
    async function loadContent() {
      const { data, headers } = await wordpress.getPosts(pageCount);
      setPosts([...posts, ...data]);
      const totalPages = parseInt(headers['x-wp-totalpages']);

      if (pageCount < totalPages) {
        setPageCount(pageCount + 1);
      }
    }

    loadContent();
  }, [pageCount]);

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
            <Homepage
            setPosts={setPosts}
            posts={posts}
            setPost={setCurrentPost}
            {...props}
            />
          )}
        />
        <Route
          exact
          path='/author/:author'
          render={(props) => (
            <Author
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
