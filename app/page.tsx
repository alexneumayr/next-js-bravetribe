'use client';
import { createGoalAction } from '@/actions/goalsActions';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

export default function Home() {
  const initialState = {
    error: {
      general: '',
    },
  };
  const [state, formAction, pending] = useActionState(
    createGoalAction,
    initialState,
  );

  const router = useRouter();

  function handleSigninButtonClick() {
    const params = new URLSearchParams();
    params.set('mode', 'signin');
    router.push(`/access?${params}`);
  }

  function handleJoinButtonClick() {
    const params = new URLSearchParams();
    params.set('mode', 'join');
    router.push(`/access?${params}`);
  }

  return (
    <>
      {'error' in state && state.error.general && (
        <p className="text-red-500 font-bold ">{state.error.general}</p>
      )}
      <h1>Landing page</h1>
      <Button variant="link" onClick={handleSigninButtonClick}>
        Sign in
      </Button>
      <Button onClick={handleJoinButtonClick}>Join now</Button>
      <form action={formAction}>
        <button disabled={pending}>New goal</button>
      </form>
    </>
  );
}
