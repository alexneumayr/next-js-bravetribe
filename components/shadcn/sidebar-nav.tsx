/* eslint-disable */

'use client';

import { buttonVariants } from '@/components/shadcn/button';
import { cn } from '@/lib/utils';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href as Route}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'font-semibold lg:text-lg',
            pathname === item.href
              ? 'bg-muted hover:bg-muted text-secondary'
              : 'hover:bg-transparent hover:underline',
            'justify-start',
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
