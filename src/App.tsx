import React from 'react';
import Footer from './components/Footer';
import { Route, Switch } from 'react-router-dom';
import Post from './components/Post';
import wordpress, { WordpressMix, WordpressPost } from './services/wordpress';
import Marquee from './components/Marquee';
import styled from 'styled-components';
import media from './media';
import Error from './components/Error';
import MailingListSignup from './components/MailingListSignup';
import Homepage from './components/Homepage';
import Author from './components/Author';
import OrderStatus from './components/ShoppingModule/OrderStatus';
import Product from './components/ShoppingModule/Product';

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
  const [mixes, setMixes] = React.useState([] as Array<WordpressMix>);
  const [authorPosts, setAuthorPosts] = React.useState(
    [] as Array<WordpressPost>
  );
  const [pageCount, setPageCount] = React.useState(1);

  React.useEffect(() => {
    async function loadPosts() {
      const { data, headers } = await wordpress.getPosts(pageCount);
      setPosts([...posts, ...data]);
      const totalPages = parseInt(headers['x-wp-totalpages']);

      if (pageCount < totalPages) {
        setPageCount(pageCount + 1);
      }
    }

    loadPosts();
  }, [pageCount]);

  React.useEffect(() => {
    async function loadMixes() {
      const { data } = await wordpress.getMixes();
      setMixes([...data]);
    }

    loadMixes();
  }, []);

  const authors = posts.map((p) => p.coauthors).flat();

  const uniqueAuthors = Array.from(new Set(authors.map((a) => a.name)))
    .filter((u) => u !== 'thinktank')
    .sort();

  return (
    <Main>
      <Route
        path='/'
        render={(props) => (
          <Marquee
            currentPost={currentPost}
            authors={uniqueAuthors.map((u) =>
              authors.find((a) => a.name === u)
            )}
            {...props}
          />
        )}
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
              mixes={mixes}
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
              mixes={mixes}
            />
          )}
        />
        <Route
          exact
          path='/preview/:id'
          render={(props) => (
            <Post
              {...props}
              post={currentPost}
              preview={true}
              setPost={setCurrentPost}
            />
          )}
        ></Route>

          <Route
          exact
          path='/product/:slug'
          render={(props) => (
            <Product
              {...props}
              // post={currentPost}
              // preview={true}
              // setPost={setCurrentPost}
            />
          )}
        ></Route>

        <Route
          exact
          path='/order/:status'
          render={(props) => <OrderStatus {...props} />}
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
