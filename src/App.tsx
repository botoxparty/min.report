import React from 'react';
import PostList from './components/PostList';
import Footer from './components/Footer';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import Post from './components/Post';
import wordpress, { WordpressPost } from './services/wordpress';
import useMetaTags from 'react-metatags-hook';
import logo from './assets/MinorityReport_Logo.jpg';

const Disclaimer = styled.div`
  background-color: #fff8dc;
  padding: 0.25em;
  text-align: center;
`;

function App() {
  const [currentPost, setCurrentPost] = React.useState({} as WordpressPost);
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
    <main>
      <Disclaimer role="alert">
        Some people may find the contents challenging as they reference adult
        themes. Viewer discretion is advised.
      </Disclaimer>
      <Route
        exact
        path="/"
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
        path="/author/:author"
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
        path="/:slug"
        render={(props) => (
          <Post {...props} post={currentPost} setPost={setCurrentPost} />
        )}
      />
      <Footer />
    </main>
  );
}

export default App;