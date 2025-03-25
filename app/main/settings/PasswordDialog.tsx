import { updateUserPasswordAction } from '@/actions/userActions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { User } from '@prisma/client';
import React, { useActionState, useEffect } from 'react';

type Props = {
  user: User;
  openDialog: boolean;
  onOpenDialogChange: (status: boolean) => void;
};

export default function PasswordDialog({
  user,
  openDialog,
  onOpenDialogChange,
}: Props) {
  const initialState = {
    success: false,
    error: {},
  };

  const [state, formAction, pending] = useActionState(
    updateUserPasswordAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      onOpenDialogChange(false);
    }
  }, [state, onOpenDialogChange]);

  return (
    <Dialog open={openDialog} onOpenChange={onOpenDialogChange}>
      <DialogContent
        className="max-w-[425px] [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            <p className="font-semibold text-2xl">Password</p>
            <p className="text-zinc-500 text-sm font-medium">
              Here you can change your password.
            </p>
          </DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <div className="space-y-2">
            <div>
              <Label>Current Password</Label>
              <Input name="current-password" type="password" />
              {state.error?.currentPassword && (
                <p className="text-red-500 font-bold text-center">
                  {state.error.currentPassword}
                </p>
              )}
            </div>
            <div>
              <Label>New Password</Label>
              <Input name="new-password" type="password" />
              {state.error?.newPassword && (
                <p className="text-red-500 font-bold text-center">
                  {state.error.newPassword}
                </p>
              )}
            </div>
            <div>
              <Label>Confirm Password</Label>
              <Input name="confirm-password" type="password" />
              {state.error?.confirmPassword && (
                <p className="text-red-500 font-bold text-center">
                  {state.error.confirmPassword}
                </p>
              )}

              {state.error?.confirmPasswordMatch && (
                <p className="text-red-500 font-bold text-center">
                  {state.error.confirmPasswordMatch}
                </p>
              )}
              {state.error?.general && (
                <p className="text-red-500 font-bold text-center">
                  {state.error.general}
                </p>
              )}
            </div>
            <Input
              name="id"
              value={user.id}
              className="mt-3"
              readOnly
              type="hidden"
            />
            {state.error?.id && (
              <p className="text-red-500 font-bold text-center">
                {state.error.id}
              </p>
            )}
          </div>
          <div className="flex justify-around w-full gap-x-2 mt-8">
            <Button
              variant="secondary"
              disabled={pending}
              className="w-full"
              type="submit"
            >
              Save
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="w-full" type="button">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
