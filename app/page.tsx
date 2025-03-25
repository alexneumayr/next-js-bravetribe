'use client';
import { Button } from '@/components/shadcn/button';
import { useRouter } from 'next/navigation';

export default function Home() {
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
      <h1>Landing page</h1>
      <Button variant="link" onClick={handleSigninButtonClick}>
        Sign in
      </Button>
      <Button onClick={handleJoinButtonClick}>Join now</Button>
    </>
  );
}
