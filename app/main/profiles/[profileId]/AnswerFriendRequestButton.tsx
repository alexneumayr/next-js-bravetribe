'use client';
import { Button } from '@/components/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import type { Friend } from '@prisma/client';
import { UserRoundCheck } from 'lucide-react';
import ConfirmReceivedFriendRequestItem from './ConfirmReceivedFriendRequestItem';
import RemoveReceivedFriendRequestItem from './RemoveReceivedFriendRequestItem';

type Props = {
  requestId: Friend['id'];
};

export default function AnswerReceivedFriendRequestButton({
  requestId,
}: Props) {
  return (
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
  );
}
