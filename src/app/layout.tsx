'use client';

import Layout from '@/components/common/Layout';
import './globals.css';
import './reset.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Layout>
          <main>{children}</main>
        </Layout>
      </body>
    </html>
  );
}
