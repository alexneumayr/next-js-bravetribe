'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import type { Experience, User } from '@prisma/client';
import { Ellipsis, Flag, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  experience: Experience;
  user: User;
};

export default function FriendsMenu({ experience, user }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();
  return (
    <>
      {/*  {showDeleteDialog && (
        <ExperienceDeleteDialog
          experience={experience}
          user={user}
          onClose={() => setShowDeleteDialog(false)}
        />
      )} */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="flex-none">
          <div className="focus:outline-none hover:bg-zinc-100 rounded-[100px] p-[6px] transition-all cursor-pointer -mr-1">
            <Ellipsis size={18} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Friend</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setShowDeleteDialog(true);
            }}
          >
            <Trash2 /> Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
