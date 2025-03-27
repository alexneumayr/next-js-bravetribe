'use client';
import {
  confirmFriendRequestAction,
  createFriendRequestAction,
  deleteReceivedFriendRequestAction,
} from '@/actions/friendsActions';
import { Button } from '@/components/shadcn/button';
import { confirmFriendRequest } from '@/database/friends';
import { useToast } from '@/hooks/use-toast';
import type { Friend, User } from '@prisma/client';
import { Check, Trash2, UserMinus, UserPlus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useActionState, useEffect } from 'react';

type Props = {
  requestId: Friend['id'];
};

export default function RemoveFriendRequestButton({ requestId }: Props) {
  const currentPath = usePathname();
  const { toast } = useToast();

  const initialState = {
    success: false,
    error: {},
  };
  const cancelFriendRequestActionWithCurrenPath =
    deleteReceivedFriendRequestAction.bind(null, currentPath);

  const [state, formAction, pending] = useActionState(
    cancelFriendRequestActionWithCurrenPath,
    initialState,
  );

  useEffect(() => {
    if (!state.success && (state.error?.requestId || state.error?.general)) {
      toast({
        variant: 'destructive',
        title: 'An error has occurred.',
        description: `${state.error.requestId?.[0] || ''}\n${state.error.general || ''}`,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction}>
      <Button size="icon" className="sm:hidden">
        <Trash2 />
      </Button>
      <Button className="hidden sm:flex">Remove request</Button>
      <input name="id" value={requestId} type="hidden" readOnly />
    </form>
  );
}
