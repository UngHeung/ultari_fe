'use client';

import Layout from '@/components/common/Layout';
import { store } from '@/components/stores/configStore';
import { Provider } from 'react-redux';
import './globals.css';
import './reset.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body>
        <Provider store={store}>
          <Layout>
            <main>{children}</main>
          </Layout>
        </Provider>
      </body>
    </html>
  );
}
