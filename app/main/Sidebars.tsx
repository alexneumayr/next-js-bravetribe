import { SidebarNav } from '@/components/shadcn/sidebar-nav';
import { type ReactNode } from 'react';
import SidebarRight from './SidebarRight';

interface SidebarLeftProps {
  children: ReactNode;
}

const sidebarNavItems = [
  {
    title: 'Home',
    href: '/main',
  },
  {
    title: 'Your goals',
    href: '/main/goals',
  },
  {
    title: 'Challenge Planner',
    href: '/main/challenges',
  },
  {
    title: 'Experiences',
    href: '/main/experiences',
  },
  {
    title: 'Friends',
    href: '/main/friends',
  },
];

export default function Sidebars({ children }: SidebarLeftProps) {
  return (
    <div className="space-y-5 p-5 pb-16">
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-5 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1">{children}</div>
        <SidebarRight />
      </div>
    </div>
  );
}
