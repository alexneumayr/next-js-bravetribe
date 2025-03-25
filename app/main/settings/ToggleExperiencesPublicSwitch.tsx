import { toggleAreExperiencesPublicAction } from '@/actions/userActions';
import { Label } from '@/components/shadcn/label';
import { Switch } from '@/components/shadcn/switch';
import type { User } from '@prisma/client';
import React, { startTransition, useActionState } from 'react';

type Props = {
  user: User;
};

export default function ToggleExperiencesPublicSwitch({ user }: Props) {
  const initialState = {
    success: false,
    error: {},
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
      {state.error?.id && (
        <p className="text-red-500 font-bold text-center">{state.error.id}</p>
      )}
      {state.error?.areExperiencesPublic && (
        <p className="text-red-500 font-bold text-center">
          {state.error.areExperiencesPublic}
        </p>
      )}
      {state.error?.general && (
        <p className="text-red-500 font-bold text-center mt-2">
          {state.error.general}
        </p>
      )}
    </>
  );
}
