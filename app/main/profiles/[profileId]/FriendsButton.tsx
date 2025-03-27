'use client';
import FriendDeleteDialog from '@/components/FriendDeleteDialog';
import { Button } from '@/components/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import type { User } from '@prisma/client';
import { Trash2, UserIcon } from 'lucide-react';
import { useState } from 'react';

type Props = {
  friendId: User['id'];
};

export default function FriendsButton({ friendId }: Props) {
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
          <div className="">
            <Button variant="default">
              <UserIcon />
              Friends
            </Button>
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
