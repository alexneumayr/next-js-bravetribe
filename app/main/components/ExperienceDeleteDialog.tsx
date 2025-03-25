import { deleteExperienceAction } from '@/actions/experienceActions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Experience, User } from '@prisma/client';
import { usePathname } from 'next/navigation';
import { useActionState } from 'react';

type Props = {
  experience: Experience;
  user: User;
  onClose: () => void;
};

export default function ExperienceDeleteDialog({
  experience,
  user,
  onClose,
}: Props) {
  const initialState = {
    success: false,
    error: {},
  };
  const currentPath = usePathname();
  const deleteExperienceActionWithCurrentPath = deleteExperienceAction.bind(
    null,
    currentPath,
  );

  const [state, formAction, pending] = useActionState(
    deleteExperienceActionWithCurrentPath,
    initialState,
  );

  // If the current user is not allowed to delete this experience, show restricted access message
  if (experience.userId !== user.id) {
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
            You do not have permission to delete this experience
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
              <p className="font-extrabold text-4xl ">Delete experience</p>
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
            <input name="id" value={experience.id} type="hidden" />
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
