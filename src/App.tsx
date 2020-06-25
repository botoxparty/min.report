import React from 'react';
import './App.css';
import PostList from './components/PostList';
import Footer from './components/Footer';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import Post from './components/Post';

const Disclaimer = styled.div`
  background-color: #fff8dc;
  padding: 0.25em;
  text-align: center;
`;

function App() {
  return (
    <div className="App">
      <Disclaimer role="alert">
        Some people may find the contents challenging as they reference adult
        themes. Viewer discretion is advised.
      </Disclaimer>
      <Route exact path="/" render={(props) => <PostList {...props} />} />
      <Route
        exact
        path="/author/:author"
        render={(props) => <PostList {...props} author={true} />}
      />
      <Route exact path="/:slug" component={Post} />
      <Footer />
    </div>
  );
}

export default App;
