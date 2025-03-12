import { type ReactNode } from 'react';
import { SidebarNav } from './components/sidebar-nav';

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
    href: '/examples/forms/account',
  },
  {
    title: 'Challenge Planner',
    href: '/examples/forms/appearance',
  },
  {
    title: 'Experiences',
    href: '/examples/forms/notifications',
  },
  {
    title: 'Friends',
    href: '/examples/forms/display',
  },
];

export default function SidebarLeft({ children }: SidebarLeftProps) {
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
