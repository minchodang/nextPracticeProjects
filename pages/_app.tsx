import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '@components/layout/layout';
import Notification from '@components/ui/Notification';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
            <Notification title={'test'} message={'this is a test.'} status={'success'} />
        </Layout>
    );
}

export default MyApp;
