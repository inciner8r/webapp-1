// src/graphql/client.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const SUBGRAPH_URL = process.env.PUBLIC_SUBGRAPH_URL || 'https://api.thegraph.com/subgraphs/name/netsepio/netsepio-mumbai';

const httpLink = new HttpLink({
  uri: SUBGRAPH_URL,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
