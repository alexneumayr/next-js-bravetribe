'use client';

import { logoutUser } from '@/actions/authActions';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  return (
    <form>
      <button
        className="bg-red-500"
        formAction={async () => {
          await logoutUser();
          router.push('/');
        }}
      >
        Logout
      </button>
    </form>
  );
}
