'use client';
import { createFriendRequestAction } from '@/actions/friendsActions';
import { Button } from '@/components/shadcn/button';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@prisma/client';
import { UserPlus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useActionState, useEffect } from 'react';

type Props = {
  receiverUserId: User['id'];
};

export default function AddFriendButton({ receiverUserId }: Props) {
  const currentPath = usePathname();
  const { toast } = useToast();

  const initialState = {
    success: false,
    error: {},
  };
  const createFriendRequestActionWithCurrentPath =
    createFriendRequestAction.bind(null, currentPath);

  const [state, formAction, pending] = useActionState(
    createFriendRequestActionWithCurrentPath,
    initialState,
  );

  useEffect(() => {
    if (
      !state.success &&
      (state.error?.receiverUserId || state.error?.general)
    ) {
      toast({
        variant: 'destructive',
        title: 'An error has occurred.',
        description: `${state.error.receiverUserId?.[0] || ''}\n${state.error.general || ''}`,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction}>
      <Button variant="secondary" disabled={pending}>
        <UserPlus /> Add friend
      </Button>
      <input name="id" value={receiverUserId} type="hidden" readOnly />
    </form>
  );
}
