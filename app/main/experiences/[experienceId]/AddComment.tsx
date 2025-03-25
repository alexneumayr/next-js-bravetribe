'use client';

import { createCommentAction } from '@/actions/commentActions';
import { Button } from '@/components/ui/button';
import type { Experience } from '@prisma/client';
import { useActionState, useEffect, useRef, useState } from 'react';

type Props = {
  experienceId: Experience['id'];
};

export default function AddComment({ experienceId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    textareaRef.current?.focus();
  });
  const initialState = {
    success: false,
    error: {},
  };
  const [state, formAction, pending] = useActionState(
    createCommentAction,
    initialState,
  );
  useEffect(() => {
    if (state.success) {
      setIsOpen(false);
    }
  }, [state]);
  return (
    <div>
      {isOpen ? (
        <form action={formAction}>
          <div className="border mt-2 rounded-3xl border-black ">
            <textarea
              className="pl-4 pt-2 rounded-3xl focus:outline-none outline-none border-none focus:border-none w-full text-sm font-medium"
              rows={2}
              ref={textareaRef}
              name="content"
            />
            {state.error?.content && (
              <p className="text-red-500 font-bold text-center">
                {state.error.content}
              </p>
            )}
            <input type="hidden" name="experienceId" value={experienceId} />
            {state.error?.experienceId && (
              <p className="text-red-500 font-bold text-center">
                {state.error.experienceId}
              </p>
            )}
            <div className="flex gap-2 justify-end mx-2 my-2">
              <Button
                variant="outline"
                className="rounded-full"
                type="button"
                size="sm"
                onClick={() => setIsOpen(false)}
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
                Comment
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
        <button
          onClick={() => setIsOpen(true)}
          className="text-sm font-light w-full border-zinc-400 text-zinc-800 text-left border px-4 py-3 rounded-3xl cursor-text mt-2"
        >
          Add a comment
        </button>
      )}
    </div>
  );
}
