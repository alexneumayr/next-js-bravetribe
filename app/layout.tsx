import './globals.css';
import { Toaster } from '@/components/shadcn/toaster';
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
    <html lang="en" className="[&:has(dialog[open])]:overflow-hidden">
      <body className="antialiased">
        {children} <Toaster />
      </body>
    </html>
  );
}
