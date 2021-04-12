import React from "react";
import App from "./App";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
	uri: "https://evening-lake-29894.herokuapp.com/",
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
