import { Separator } from '@/components/ui/separator';
import SettingsTabs from './SettingsTabs';

export default function SettingsPage() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-lg font-medium">
          Manage your account and profile settings here.
        </p>
      </div>
      <Separator className="mt-4" />
      <SettingsTabs />
    </>
  );
}
