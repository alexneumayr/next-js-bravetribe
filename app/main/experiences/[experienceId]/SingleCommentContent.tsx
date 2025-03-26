import { updateCommentAction } from '@/actions/commentActions';
import { Button } from '@/components/shadcn/button';
import { getTimeAgo } from '@/util/getTimeAgo';
import type { Comment, User } from '@prisma/client';
import { useActionState, useEffect, useState } from 'react';
import CommentMenu from './CommentMenu';

type Props = {
  comment: Comment;
  user: User;
};

export default function SingleCommentContent({ comment, user }: Props) {
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const initialState = {
    success: false,
    error: {},
  };
  const [state, formAction, pending] = useActionState(
    updateCommentAction,
    initialState,
  );
  function handleEditMode() {
    setIsEditModeOn(true);
  }
  useEffect(() => {
    if (state.success) {
      setIsEditModeOn(false);
    }
  }, [state]);
  return (
    <div className="px-2 pb-1 pt-2 sm:pt-4 sm:pb-2 w-full">
      <div className="justify-between flex">
        <p className="text-sm font-extralight hidden sm:block">
          {getTimeAgo(comment.createdAt)}
        </p>
        <div className="absolute sm:static right-0 top-6">
          <CommentMenu
            comment={comment}
            user={user}
            onEditMode={handleEditMode}
          />
        </div>
      </div>
      {isEditModeOn ? (
        <form action={formAction}>
          <div className="border sm:mt-1 rounded-3xl border-black ">
            <textarea
              className="pl-4 pt-2 rounded-3xl focus:outline-none outline-none border-none focus:border-none w-full text-sm font-medium"
              rows={2}
              name="content"
              defaultValue={comment.content}
            />
            {state.error?.content && (
              <p className="text-red-500 font-bold text-center">
                {state.error.content}
              </p>
            )}
            <input name="id" value={comment.id} type="hidden" />
            {state.error?.id && (
              <p className="text-red-500 font-bold text-center">
                {state.error.id}
              </p>
            )}
            <div className="flex gap-2 justify-end mx-2 my-2">
              <Button
                variant="outline"
                className="rounded-full"
                type="button"
                size="sm"
                onClick={() => setIsEditModeOn(false)}
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                disabled={pending}
                className="rounded-full"
                type="submit"
                size="sm"
              >
                Save
              </Button>
              {state.error?.general && (
                <p className="text-red-500 font-bold text-center">
                  {state.error.general}
                </p>
              )}
            </div>
          </div>
        </form>
      ) : (
        <p className="text-sm font-medium whitespace-pre-wrap">
          {comment.content}
        </p>
      )}
    </div>
  );
}
