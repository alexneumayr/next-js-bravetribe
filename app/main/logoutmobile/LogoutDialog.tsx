'use client';
import { logoutUserAction } from '@/actions/authActions';
import { Button } from '@/components/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';
import type { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

type Props = {
  username: User['username'];
};

export default function LogoutDialog({ username }: Props) {
  const initialState = {
    success: false,
    error: {},
  };

  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    logoutUserAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      router.push('/access');
    }
  }, [state, router]);

  return (
    <Dialog defaultOpen>
      <DialogContent
        className="max-w-[425px] [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center font-semibold text-2xl">
            Do you really want to log out?
          </DialogTitle>
        </DialogHeader>
        {!state.success ? (
          <p className="text-center text-lg text-zinc-600 mt-5 mb-8">
            Log out {username} from BraveTribe?
          </p>
        ) : (
          <p className="text-center mt-5 mb-8 text-lg text-green-500 font-semibold">
            Logout successful
          </p>
        )}
        <DialogFooter>
          <form
            className="flex justify-around w-full gap-x-2"
            action={formAction}
          >
            <Button className="w-full" type="submit" disabled={pending}>
              Logout
            </Button>
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
