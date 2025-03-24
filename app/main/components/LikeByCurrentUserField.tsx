'use client';
import { deleteLikeAction } from '@/actions/likeActions';
import type { Like, User } from '@prisma/client';
import { Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useActionState } from 'react';

type Props = {
  likes: Like[];
  userId: User['id'];
};

export default function LikeByCurrentUserField({ likes, userId }: Props) {
  const currentPath = usePathname();
  const deleteLikeActionWithCurrentPath = deleteLikeAction.bind(
    null,
    currentPath,
  );
  const initialState = {
    error: {
      general: '',
    },
  };
  const [state, formAction, pending] = useActionState(
    deleteLikeActionWithCurrentPath,
    initialState,
  );

  const likeId = likes.find((like) => like.userId === userId)?.id;

  return (
    <form action={formAction}>
      <button
        disabled={pending}
        className="bg-[#ededed] rounded-[100px] px-2 py-1 text-xs flex gap-1"
      >
        <Heart size={15} color="black" fill="black" />
        {likes.length}
      </button>
      <input name="id" value={likeId} type="hidden" />
      {'error' in state && state.error.id && (
        <p className="text-red-500 font-bold text-center">{state.error.id}</p>
      )}
      {'error' in state && state.error.general && (
        <p className="text-red-500 font-bold text-center">
          {state.error.general}
        </p>
      )}
    </form>
  );
}
