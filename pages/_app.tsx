import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '@components/layout/layout';
import { NotificationContextProvider } from '../store/notification-context';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <NotificationContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </NotificationContextProvider>
    );
}

export default MyApp;
