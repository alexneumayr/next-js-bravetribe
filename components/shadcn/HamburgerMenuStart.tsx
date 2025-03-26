'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/shadcn/collapsible';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/shadcn/sheet';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
import * as React from 'react';

type MenuItem = {
  title: string;
  href?: string;
  submenu?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { title: 'Start', href: '/' },
  { title: 'Sign in', href: '/access?mode=signin' },
  { title: 'Join now', href: '/access?mode=join' },
];

const MenuItemComponent: React.FC<{ item: MenuItem; depth?: number }> = ({
  item,
  depth = 0,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (item.submenu) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              'flex w-full items-center justify-between py-2 text-lg font-medium transition-colors hover:text-primary',
              depth > 0 && 'pl-4',
            )}
          >
            {item.title}
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {item.submenu.map((subItem) => (
            <MenuItemComponent
              key={`subItem-${subItem.title}`}
              item={subItem}
              depth={depth + 1}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <a
      href={item.href}
      className={cn(
        'block p-2 text-md font-medium transition-colors hover:text-primary hover:bg-zinc-200 rounded-md mr-2',
        depth > 0 && 'pl-4',
        item.href === '/' && 'text-primary',
      )}
    >
      {item.title}
    </a>
  );
};

export default function HamburgerMenuStart() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="hover:bg-accent p-1 rounded-md transition-colors sm:hidden">
          <Menu size={25} />
          <span className="sr-only">Toggle menu</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[240px] sm:w-[300px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetTitle className="sr-only">Main Menu</SheetTitle>
        <nav className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <MenuItemComponent key={`title-${item.title}`} item={item} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
