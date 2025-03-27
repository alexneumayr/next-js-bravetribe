'use client';
import { deleteSentFriendRequestAction } from '@/actions/friendsActions';
import { Button } from '@/components/shadcn/button';
import { useToast } from '@/hooks/use-toast';
import type { Friend } from '@prisma/client';
import { UserMinus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useActionState, useEffect } from 'react';

type Props = {
  requestId: Friend['id'];
};

export default function CancelFriendRequestButton({ requestId }: Props) {
  const currentPath = usePathname();
  const { toast } = useToast();

  const initialState = {
    success: false,
    error: {},
  };
  const cancelFriendRequestActionWithCurrenPath =
    deleteSentFriendRequestAction.bind(null, currentPath);

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
      <Button variant="default" disabled={pending}>
        <UserMinus /> Cancel request
      </Button>
      <input name="id" value={requestId} type="hidden" readOnly />
    </form>
  );
}
