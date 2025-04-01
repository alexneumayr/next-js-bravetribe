'use client';
import { acceptFriendRequestAction } from '@/actions/friendsActions';
import { Button } from '@/components/shadcn/button';
import { useToast } from '@/hooks/use-toast';
import type { Friend } from '@prisma/client';
import { Check } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useActionState, useEffect } from 'react';

type Props = {
  requestId: Friend['id'];
};

export default function ConfirmFriendRequestButton({ requestId }: Props) {
  const currentPath = usePathname();
  const { toast } = useToast();

  const initialState = {
    success: false,
    error: {},
  };
  const acceptfriendRequestActionWithCurrentPath =
    acceptFriendRequestAction.bind(null, currentPath);

  const [state, formAction, pending] = useActionState(
    acceptfriendRequestActionWithCurrentPath,
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
    <form action={formAction} className="ml-auto">
      <Button
        variant="secondary"
        size="icon"
        className="sm:hidden"
        disabled={pending}
      >
        <Check />
      </Button>
      <Button variant="secondary" className="hidden sm:flex" disabled={pending}>
        Confirm request
      </Button>
      <input name="id" value={requestId} type="hidden" readOnly />
    </form>
  );
}
