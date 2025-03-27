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
import type { Experience, Friend, User } from '@prisma/client';
import {
  CircleCheck,
  Ellipsis,
  Flag,
  Pencil,
  Trash2,
  UserIcon,
  UserRoundCheck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ConfirmReceivedFriendRequestItem from './ConfirmReceivedFriendRequestItem';
import RemoveFriendRequestItem from './RemoveFriendRequestItem';
import RemoveReceivedFriendRequestItem from './RemoveReceivedFriendRequestItem';

type Props = {
  requestId: Friend['id'];
};

export default function AnswerReceivedFriendRequestButton({
  requestId,
}: Props) {
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
              <UserRoundCheck /> Answer request
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Friend request</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ConfirmReceivedFriendRequestItem requestId={requestId} />
          <RemoveReceivedFriendRequestItem requestId={requestId} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
