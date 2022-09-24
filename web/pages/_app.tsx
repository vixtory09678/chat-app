import '../styles/globals.css';
import '../styles/home/message.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';
import { Connector } from 'mqtt-react-hooks';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  layout: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const layout = Component.layout || ((page) => <>{page}</>);
  const MQTT_BROKER_URL = publicRuntimeConfig.NEXT_PUBLIC_MQTT_BROKER_URL;

  return (
    <SnackbarProvider maxSnack={3}>
      <Connector
        brokerUrl={MQTT_BROKER_URL}
        options={{
          port: 9001,
        }}
      >
        {layout(<Component {...pageProps} />)}
      </Connector>
    </SnackbarProvider>
  );
}

export default MyApp;
