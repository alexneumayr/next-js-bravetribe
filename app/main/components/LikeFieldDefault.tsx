'use client';
import { createLikeAction } from '@/actions/likeActions';
import type { Experience, Like } from '@prisma/client';
import { Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useActionState } from 'react';

type Props = {
  likes: Like[];
  experienceId: Experience['id'];
};

export default function LikeFieldDefault({ likes, experienceId }: Props) {
  const currentPath = usePathname();
  const createLikeActionWithCurrentPath = createLikeAction.bind(
    null,
    currentPath,
  );
  const initialState = {
    error: {
      general: '',
    },
  };
  const [state, formAction, pending] = useActionState(
    createLikeActionWithCurrentPath,
    initialState,
  );

  return (
    <form action={formAction}>
      <button
        disabled={pending}
        className="bg-[#ededed] rounded-[100px] px-2 py-1 text-xs flex gap-1"
      >
        <Heart size={15} />
        {likes.length}
      </button>
      <input name="experienceId" value={experienceId} type="hidden" />
      {'error' in state && state.error.experienceId && (
        <p className="text-red-500 font-bold text-center">
          {state.error.experienceId}
        </p>
      )}
      {'error' in state && state.error.general && (
        <p className="text-red-500 font-bold text-center">
          {state.error.general}
        </p>
      )}
    </form>
  );
}
