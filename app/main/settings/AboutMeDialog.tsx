import { updateUserAction } from '@/actions/userActions';
import { Button } from '@/components/shadcn/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';
import { Input } from '@/components/shadcn/input';
import { Textarea } from '@/components/shadcn/textarea';
import type { User } from '@prisma/client';
import React, { useActionState, useEffect } from 'react';

type Props = {
  user: User;
  openDialog: boolean;
  onOpenDialogChange: (status: boolean) => void;
};

export default function AboutMeDialog({
  user,
  openDialog,
  onOpenDialogChange,
}: Props) {
  const initialState = {
    success: false,
    error: {},
  };

  const [state, formAction, pending] = useActionState(
    updateUserAction,
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
            <p className="font-semibold text-2xl">About me</p>
            <p className="text-zinc-500 text-sm font-medium">
              Here you can change your about me description .
            </p>
          </DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <Textarea
            rows={4}
            defaultValue={user.aboutDescription || undefined}
            className="mt-3"
            name="about-description"
          />
          {state.error?.email && (
            <p className="text-red-500 font-bold text-center">
              {state.error.aboutDescription}
            </p>
          )}
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
          {state.error?.general && (
            <p className="text-red-500 font-bold ">{state.error.general}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
