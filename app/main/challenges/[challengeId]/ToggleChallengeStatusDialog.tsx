import { updateChallengeStatusAction } from '@/actions/challengeActions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import type { Challenge } from '@prisma/client';
import { useActionState, useState } from 'react';

type Props = {
  challenge: Challenge;
};

export default function ToggleChallengeStatusDialog({ challenge }: Props) {
  const [isCompleted, setIsCompleted] = useState(challenge.isCompleted);
  const initialState = {
    error: {
      general: '',
    },
  };

  const updateChallengeStatusActionWithSwitchValue =
    updateChallengeStatusAction.bind(null, isCompleted);

  const [state, formAction, pending] = useActionState(
    updateChallengeStatusActionWithSwitchValue,
    initialState,
  );

  return (
    <Dialog>
      <DialogTrigger>
        <div className="">
          {challenge.isCompleted ? (
            <Badge className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 border-emerald-600/60 shadow-none rounded-full">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2" />{' '}
              Completed
            </Badge>
          ) : (
            <Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 border-amber-600/60 shadow-none rounded-full cursor-pointer">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2" />
              Todo
            </Badge>
          )}
        </div>
      </DialogTrigger>
      <DialogContent
        className="max-w-[425px] [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            <p className="font-semibold text-2xl">Update status</p>
            <p className="text-zinc-500 text-sm font-medium">
              Here you can update the challenge status.
            </p>
          </DialogTitle>
        </DialogHeader>

        <form action={formAction}>
          <div className="flex justify-between items-center mt-2">
            <p className="text-2xl font-medium">Challenge completed?</p>
            <Switch
              className="data-[state=checked]:bg-emerald-500 h-8 w-14"
              thumbClassName="h-7 w-7 data-[state=checked]:translate-x-6"
              onCheckedChange={(checked) => setIsCompleted(checked)}
              defaultChecked={isCompleted}
            />
          </div>
          <input name="id" value={challenge.id} type="hidden" />
          <div>{'error' in state && state.error.id}</div>

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
        {'error' in state && state.error.general && (
          <p className="text-red-500 font-bold ">{state.error.general}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
