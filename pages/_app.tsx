import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import AppLayout from '../layouts/AppLayout';
import config from '../config';

const { chains, provider, webSocketProvider } = configureChains(
  [
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [chain.rinkeby] //[chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
    ...(process.env.NEXT_PUBLIC_ENABLE_LOCALHOST === 'true'
      ? [chain.localhost]
      : [chain.mainnet]),
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_KEY || '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC',
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const theme = extendTheme({
  config: {
    initialColorMode: config.theme,
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        fontFamily: "'Open Sans', sans-serif",
      }
    }
  },
  fonts: {
    heading: "'Roboto Slab', serif"
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme({ accentColor: '#181818' })}>
        <ChakraProvider theme={theme}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
