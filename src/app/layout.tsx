'use client';

import './globals.css';
import './reset.css';
import { Provider } from 'react-redux';
import { store } from '@/components/stores/configStore';
import Layout from '@/components/common/Layout';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const persistor = persistStore(store);

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
