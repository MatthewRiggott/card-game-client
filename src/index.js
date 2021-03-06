import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  link: new HttpLink({uri: "http://localhost:3000/graphql"}),
  cache: new InMemoryCache()
});

ReactDOM.render(
  (<ApolloProvider client={client}>
    <App />
  </ApolloProvider>),
  document.getElementById('root'),
);