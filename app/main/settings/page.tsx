import { Separator } from '@/components/shadcn/separator';
import { getUserBySessionToken } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';
import SettingsTabs from './SettingsTabs';

export default async function SettingsPage() {
  const sessionTokenCookie = await getCookie('sessionToken');

  const user =
    sessionTokenCookie && (await getUserBySessionToken(sessionTokenCookie));
  if (!user) {
    redirect(`/access?mode=signin&returnTo=/main/settings`);
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-lg font-medium">
          Manage your account and profile settings here.
        </p>
      </div>
      <Separator className="mt-4" />
      <SettingsTabs user={user} />
    </>
  );
}
