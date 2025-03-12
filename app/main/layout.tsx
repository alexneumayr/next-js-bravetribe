import Header from './Header';
import Sidebars from './Sidebars';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Sidebars>{children}</Sidebars>
    </>
  );
}
