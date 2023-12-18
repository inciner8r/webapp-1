// src/index.tsx
import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ApolloProvider } from '@apollo/client';
import {GoogleOAuthProvider} from '@react-oauth/google';
// import { client } from './graphql/client';
// import { Provider } from 'react-redux';
// import store from './store';
import App from './App';

// const { chains, provider, webSocketProvider } = configureChains(
//   [
//     mainnet,
//     polygon,
//     optimism,
//     arbitrum,
//     ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true' ? [goerli] : []),
//   ],
//   [publicProvider()]
// );

// const { connectors } = getDefaultWallets({
//   appName: 'Netsepio',
//   chains,
// });

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider,
//   webSocketProvider,
// });

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider 
          modalSize="compact" 
          chains={chains}
          theme={midnightTheme({
            accentColor: '#69d685',
            accentColorForeground: 'black',
            borderRadius: 'medium',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
      >
        <ApolloProvider client={client}>
          <Provider store={store}> */}
          <GoogleOAuthProvider clientId="699954671747-bqj0rvn0q2296skerds6indulobrv1fv.apps.googleusercontent.com">
            <App/>
          </GoogleOAuthProvider>;
          {/* </Provider>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig> */}
  </React.StrictMode>
);
