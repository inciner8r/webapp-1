import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import {wagmiClient, Chains as chains} from '../walletConfig'
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "https://query.graph.lazarus.network/subgraphs/name/NetSepio",
    cache: new InMemoryCache(),
  });
  return (<>
  <div className='backgroundImage'></div>
  <div className='backgroundImage2'></div>
  <WagmiConfig client={wagmiClient}>
  <RainbowKitProvider chains={chains}>
  <ApolloProvider client={client}>
  
  <Navbar/>

  <Component {...pageProps} />
  </ApolloProvider>
  </RainbowKitProvider>
  </WagmiConfig>
  </>)
}

export default MyApp
