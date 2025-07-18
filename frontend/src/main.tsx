import { createRoot } from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { darkTheme, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { GlobalStyles, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { customChains, supportedChains } from "@app-chains";
import { theme } from './theme';
import { App } from './App.tsx';

import CssBaseline from '@mui/material/CssBaseline';
import '@rainbow-me/rainbowkit/styles.css';

const config = getDefaultConfig({
  appName: 'My Dapp',
  projectId: 'TWÓJ_PROJECT_ID_Z_WALLETCONNECT',
  ssr: false,
  chains: [...supportedChains, ...customChains],
});

const queryClient = new QueryClient();

const rainbowKitTheme = {
  ...darkTheme({
    accentColor: '#7b3fe4',
    accentColorForeground: 'white',
    borderRadius: 'medium'
  })
};

createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider theme={rainbowKitTheme}>
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
              styles={{
                '*::-webkit-scrollbar': { width: '0.4em' },
                '*::-webkit-scrollbar-track': { WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)' },
                '*::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,.1)', outline: '1px solid slategrey' },
                '*::-webkit-scrollbar-button': {
                  display: 'none',
                  width: 0,
                  height: 0
                }
              }}
            />
            <App />
          </ThemeProvider>
        </SnackbarProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
