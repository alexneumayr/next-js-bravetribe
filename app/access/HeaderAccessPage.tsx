'use client';
import { Button } from '@/components/shadcn/button';
import HamburgerMenuStart from '@/components/shadcn/HamburgerMenuStart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HeaderLandingPage() {
  const router = useRouter();
  return (
    <header>
      <div className="bg-secondary h-1 sm:h-3 " />
      <div className="h-[50px] sm:h-[110px] shadow-[0px_4px_4px_0px_rgba(166,166,166,0.25)]">
        <div className="px-5 flex gap-2 h-full items-center justify-between  bg-white w-full">
          <Link href="/">
            <img
              src="/logos/logo-header.png"
              className="w-[30px] sm:w-[80px]"
              alt="BraveTribe logo"
            />
          </Link>
          <HamburgerMenuStart />
          <div className="hidden sm:flex items-center gap-4">
            <Button onClick={() => router.back()}>Back</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
