import { deleteUserAction } from '@/actions/userActions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { User } from '@prisma/client';
import React, { useActionState, useEffect } from 'react';

type Props = {
  user: User;
  openDialog: boolean;
  onOpenDialogChange: (status: boolean) => void;
};

export default function DeleteAccountDialog({
  user,
  openDialog,
  onOpenDialogChange,
}: Props) {
  const initialState = {
    success: false,
    error: {},
  };

  const [state, formAction, pending] = useActionState(
    deleteUserAction,
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
            <div className="flex justify-center">
              <p className="font-extrabold text-4xl ">Delete account</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <p className="text-center font-bold text-2xl text-destructive mt-2">
            Are you sure?
          </p>
          <div>
            <p className="text-center font-bold mt-2">
              Type in "DELETE" to confirm
            </p>
            <Input name="delete-confirmation" className="mt-3" />
            {state.error?.deleteConfirmation && (
              <p className="text-red-500 font-bold text-center mt-2">
                {state.error.deleteConfirmation}
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
          <div className="flex justify-around w-full gap-x-2 mt-8">
            <Button
              variant="destructive"
              disabled={pending}
              className="w-full"
              type="submit"
            >
              Delete
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="w-full" type="button">
                Cancel
              </Button>
            </DialogClose>
          </div>
          {state.error?.general && (
            <p className="text-red-500 font-bold text-center mt-2">
              {state.error.general}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
