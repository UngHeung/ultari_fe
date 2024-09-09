'use client';

import './globals.css';
import './reset.css';
import { Provider } from 'react-redux';
import { store } from '@/components/stores/configStore';
import Layout from '@/components/common/Layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
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
