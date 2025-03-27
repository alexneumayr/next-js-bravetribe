'use client';
import { Button } from '@/components/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import type { Experience, User } from '@prisma/client';
import { Ellipsis, Flag, Pencil, Trash2, UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  experience: Experience;
  user: User;
};

export default function FriendsButton({ experience, user }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();
  return (
    <>
      {/*     {showDeleteDialog && (
        <ExperienceDeleteDialog
          experience={experience}
          user={user}
          onClose={() => setShowDeleteDialog(false)}
        />
      )} */}
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
