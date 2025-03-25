import { toggleAreExperiencesPublicAction } from '@/actions/userActions';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { User } from '@prisma/client';
import React, { startTransition, useActionState, useEffect } from 'react';

type Props = {
  user: User;
};

export default function ToggleExperiencesPublicSwitch({ user }: Props) {
  const initialState = {
    error: {
      general: '',
    },
  };

  const [state, switchAction] = useActionState(
    toggleAreExperiencesPublicAction,
    initialState,
  );

  return (
    <>
      <div className="flex justify-between items-center ">
        <Label
          htmlFor="public-challenges"
          className="flex-1 text-lg font-semibold cursor-pointer"
        >
          Show my experiences in public
        </Label>
        <Switch
          id="public-challenges"
          className="data-[state=checked]:bg-secondary"
          onCheckedChange={(checked) =>
            startTransition(() => {
              switchAction({ id: user.id, areExperiencesPublic: checked });
            })
          }
          defaultChecked={user.areExperiencesPublic}
        />
      </div>
      {'error' in state && state.error.id && (
        <p className="text-red-500 font-bold text-center">{state.error.id}</p>
      )}
      {'error' in state && state.error.areExperiencesPublic && (
        <p className="text-red-500 font-bold text-center">
          {state.error.areExperiencesPublic}
        </p>
      )}
      {'error' in state && state.error.general && (
        <p className="text-red-500 font-bold text-center mt-2">
          {state.error.general}
        </p>
      )}
    </>
  );
}
