import './globals.css';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'BraveTribe',
  description:
    'Step out of your comfort zone! Our community-driven platform connects people who want to challenge themselves and grow. Find support, share experiences, and take on exciting Comfort Zone Challenges together. Join now and push your limits!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
