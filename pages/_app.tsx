import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import {wagmiClient, Chains as chains} from '../walletConfig'
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ThemeProvider } from 'next-themes';
import SearchFilter from '../components/SearchFilter';
import SidebarFilter from '../components/SidebarFilter';
import ReviwesState from '../context/reviews/ReviewsState';

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "https://query.graph.lazarus.network/subgraphs/name/NetSepio",
    cache: new InMemoryCache(),
  });
  return (
  <>
  <ReviwesState>
  <ThemeProvider enableSystem={true} attribute='class'>

  <WagmiConfig client={wagmiClient}>
  <RainbowKitProvider chains={chains}>
  <ApolloProvider client={client}>
  
  <Navbar/>

  {/* <SearchFilter/> */}

  {/* <div style={{display:'flex'}}> */}
  <Component {...pageProps} />
  {/* <SidebarFilter/> */}
  {/* </div> */}
  </ApolloProvider>
  </RainbowKitProvider>
  </WagmiConfig>

  <Footer/>

  </ThemeProvider>
  </ReviwesState>
  </>
  )
}

export default MyApp
