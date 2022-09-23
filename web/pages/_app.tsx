import '../styles/globals.css';
import '../styles/home/message.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  layout: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const layout = Component.layout || ((page) => <>{page}</>);
  return (
    <SnackbarProvider maxSnack={3}>
      {layout(<Component {...pageProps} />)}
    </SnackbarProvider>
  );
}

export default MyApp;
