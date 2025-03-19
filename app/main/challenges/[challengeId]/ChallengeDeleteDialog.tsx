import { deleteChallengeAction } from '@/actions/challengeActions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Challenge } from '@prisma/client';
import { useActionState } from 'react';

type Props = {
  challenge: Challenge;
  onClose: () => void;
};

export default function ChallengeDeleteDialog({ challenge, onClose }: Props) {
  const initialState = {
    error: {
      general: '',
    },
  };

  const [state, formAction, pending] = useActionState(
    deleteChallengeAction,
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
              <p className="font-extrabold text-4xl ">Delete challenge</p>
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
            <input name="id" value={challenge.id} type="hidden" />
            {'error' in state && state.error.id && (
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
            {'error' in state && state.error.general && (
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
