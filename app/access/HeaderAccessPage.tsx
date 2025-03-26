'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function HeaderAccessPage() {
  return (
    <header>
      <div className="bg-secondary h-3 " />
      <div className="h-[110px] shadow-[0px_4px_4px_0px_rgba(166,166,166,0.25)]">
        <div className="px-5 flex gap-2 h-full items-center justify-center  bg-white w-full">
          <Link href="/">
            <Image
              src="/logos/logo-header.png"
              width={80}
              height={80}
              alt="BraveTribe logo"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
