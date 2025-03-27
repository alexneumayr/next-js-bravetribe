import { deleteFriendAction } from '@/actions/friendsActions';
import { Button } from '@/components/shadcn/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';
import type { User } from '@prisma/client';
import { usePathname } from 'next/navigation';
import { useActionState } from 'react';

type Props = {
  friendId: User['id'];
  onClose: () => void;
};

export default function FriendDeleteDialog({ friendId, onClose }: Props) {
  const initialState = {
    success: false,
    error: {},
  };
  const currentPath = usePathname();
  const deleteFriendActionWithCurrentPath = deleteFriendAction.bind(
    null,
    currentPath,
  );

  const [state, formAction, pending] = useActionState(
    deleteFriendActionWithCurrentPath,
    initialState,
  );

  return (
    <Dialog defaultOpen onOpenChange={() => onClose()}>
      <DialogContent
        className="max-w-[425px] [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-center">
              <p className="font-extrabold text-4xl ">Remove friend</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <p
          className="text-center font-bold text-2xl text-destructive mt-2
      "
        >
          Are you sure?
        </p>
        <DialogFooter>
          <form action={formAction} className="w-full">
            <input name="id" value={friendId} type="hidden" />
            {state.error?.friendId && (
              <p className="text-red-500 font-bold ">{state.error.friendId}</p>
            )}
            <div className="flex justify-around w-full gap-x-2 mt-6">
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
              <p className="text-red-500 font-bold text-center">
                {state.error.general}
              </p>
            )}
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
