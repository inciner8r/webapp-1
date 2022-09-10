import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import Content from '../components/Content'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "https://query.graph.lazarus.network/subgraphs/name/NetSepio",
    cache: new InMemoryCache(),
  });
  return (<>
  <ApolloProvider client={client}>

  <Navbar/>
  <Content/>
  <Component {...pageProps} />
  </ApolloProvider>
  </>)
}

export default MyApp
