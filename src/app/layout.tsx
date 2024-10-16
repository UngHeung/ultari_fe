'use client';

import Layout from '@/components/common/Layout';
import { store } from '@/components/stores/configStorePersist';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import './globals.css';
import './reset.css';

export const persistor = persistStore(store);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout>
              <main>{children}</main>
            </Layout>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
