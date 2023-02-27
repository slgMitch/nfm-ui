import PropTypes from 'prop-types'
import { useRouter } from 'next/router';
import { SessionProvider } from "next-auth/react"
import Head from 'next/head'
import { createClient, configureChains, WagmiConfig } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { mainnet } from "wagmi/chains"
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import { SnipcartProvider } from 'use-snipcart'
import theme from '../theme'
import createEmotionCache from '../createEmotionCache'
import Layout from '@/components/Layout/Layout'


function useResetHistory() {
  const router = useRouter()

  useEffect(() => {
    document.addEventListener("snipcart.ready", () => {
      Snipcart.events.on('snipcart.initialized', (snipcartState) => {
        // use `router.asPath` instead of `router.pathname`
        router.replace(router.asPath)
        Snipcart.events.on('cart.confirmed', async (cartConfirmResponse) => {
          console.log(cartConfirmResponse);
        })
      });
    });
  }, [router])
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnipcartProvider>
              <Layout />
              <Component {...pageProps} />
            </SnipcartProvider>
          </ThemeProvider>
        </CacheProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};