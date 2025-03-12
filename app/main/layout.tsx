import Header from './Header';
import SidebarLeft from './SidebarLeft';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <SidebarLeft>{children}</SidebarLeft>
    </>
  );
}
