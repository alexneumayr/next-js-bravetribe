'use client';
import FriendDeleteDialog from '@/components/FriendDeleteDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import type { User } from '@prisma/client';
import { Ellipsis, Trash2 } from 'lucide-react';
import { useState } from 'react';

type Props = {
  friendId: User['id'];
};

export default function FriendsMenu({ friendId }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
      {showDeleteDialog && (
        <FriendDeleteDialog
          friendId={friendId}
          onClose={() => setShowDeleteDialog(false)}
        />
      )}
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
