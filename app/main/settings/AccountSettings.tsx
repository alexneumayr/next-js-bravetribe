import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronRight } from 'lucide-react';

export default function AccountSettings() {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-lg font-semibold" htmlFor="username-input">
          Username
        </Label>
        <Input id="username-input" name="username" />
      </div>
      <div>
        <Label className="text-lg font-semibold" htmlFor="email-input">
          Email
        </Label>
        <Input id="email-input" name="email" type="email" />
      </div>
      <div className="flex justify-between items-center cursor-pointer group">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Password</p>
          <p className="text-sm font-normal text-zinc-600">
            Change your password
          </p>
        </div>
        <div className="group-hover:bg-zinc-100 rounded-full p-2">
          <ChevronRight />
        </div>
      </div>
      <div className="flex gap-2 items-start">
        <Button variant="secondary">Update settings</Button>
        <Button>Discard changes</Button>
      </div>
    </div>
  );
}
