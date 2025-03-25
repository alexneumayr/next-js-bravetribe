import { deleteCommentAction } from '@/actions/commentActions';
import { Button } from '@/components/shadcn/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';
import type { Comment, User } from '@prisma/client';
import { useActionState } from 'react';

type Props = {
  comment: Comment;
  user: User;
  onClose: () => void;
};

export default function CommentDeleteDialog({ comment, user, onClose }: Props) {
  const initialState = {
    success: false,
    error: {},
  };

  const [state, formAction, pending] = useActionState(
    deleteCommentAction,
    initialState,
  );

  // If the current user is not allowed to delete this comment, show restricted access message
  if (comment.userId !== user.id) {
    return (
      <Dialog defaultOpen onOpenChange={() => onClose()}>
        <DialogContent
          className="max-w-[425px] [&>button]:hidden"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-center">
                <p className="font-extrabold text-4xl text-destructive">
                  Access denied
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <p className="text-center">
            You do not have permission to delete this comment
          </p>
          <DialogClose asChild>
            <p className="text-center text-[#0000FF] underline cursor-pointer">
              Back to Experience
            </p>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog defaultOpen onOpenChange={() => onClose()}>
      <DialogContent
        className="max-w-[425px] [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-center">
              <p className="font-extrabold text-4xl ">Delete comment</p>
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
            <input name="id" value={comment.id} type="hidden" />
            {state.error?.id && (
              <p className="text-red-500 font-bold ">{state.error.id}</p>
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
