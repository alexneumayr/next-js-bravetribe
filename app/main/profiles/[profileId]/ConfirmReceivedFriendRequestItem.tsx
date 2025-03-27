'use client';
import { confirmFriendRequestAction } from '@/actions/friendsActions';
import { DropdownMenuItem } from '@/components/shadcn/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import type { Friend } from '@prisma/client';
import { CircleCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useActionState, useEffect } from 'react';

type Props = {
  requestId: Friend['id'];
};

export default function ConfirmReceivedFriendRequestItem({ requestId }: Props) {
  const currentPath = usePathname();
  const { toast } = useToast();

  const initialState = {
    success: false,
    error: {},
  };
  const confirmFriendRequestActionWithCurrentPath =
    confirmFriendRequestAction.bind(null, currentPath);

  const [state, formAction, pending] = useActionState(
    confirmFriendRequestActionWithCurrentPath,
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
      <button disabled={pending}>
        <DropdownMenuItem className="cursor-pointer">
          <CircleCheck /> Confirm
        </DropdownMenuItem>
      </button>
      <input name="id" value={requestId} type="hidden" readOnly />
    </form>
  );
}
