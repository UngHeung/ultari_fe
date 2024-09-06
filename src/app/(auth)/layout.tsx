import Header from '@/components/common/layouts/Header';
import Footer from '@/components/common/layouts/Footer';
import '@/app/reset.css';
import '@/app/globals.css';

export default function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    tag: string;
    item: string;
  };
}) {
  console.log(params.tag, ' ', params.item);
  return (
    <>
      <h1>{params.item}</h1>
      {children}
      <h1>{params.item}</h1>
    </>
  );
}
