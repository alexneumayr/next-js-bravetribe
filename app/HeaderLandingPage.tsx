'use client';
import { Button } from '@/components/shadcn/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HeaderLandingPage() {
  const router = useRouter();
  return (
    <header>
      <div className="bg-secondary h-3 " />
      <div className="h-[110px] shadow-[0px_4px_4px_0px_rgba(166,166,166,0.25)]">
        <div className="px-5 flex gap-2 h-full items-center justify-between  bg-white w-full">
          <Link href="/">
            <Image
              src="/logos/logo-header.png"
              width={80}
              height={80}
              alt="BraveTribe logo"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push('/access?mode=signin')}
            >
              Sign in
            </Button>
            <Button onClick={() => router.push('/access?mode=join')}>
              Join now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
