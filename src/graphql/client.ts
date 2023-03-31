import { ApolloClient, InMemoryCache } from '@apollo/client';

const SUBGRAPH_URL = process.env.PUBLIC_SUBGRAPH_URL || 'https://api.thegraph.com/subgraphs/name/netsepio/netsepio-mumbai';

export const client = new ApolloClient({
  uri: SUBGRAPH_URL,
  cache: new InMemoryCache(),
});
