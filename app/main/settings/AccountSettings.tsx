'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { User } from '@prisma/client';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import DeleteAccountDialog from './DeleteAccountDialog';
import EmailDialog from './EmailDialog';
import PasswordDialog from './PasswordDialog';
import UsernameDialog from './UsernameDialog';

type Props = {
  user: User;
};

export default function AccountSettings({ user }: Props) {
  const [isUsernameDialogOpen, setIsUsernameDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] =
    useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div
        className="flex justify-between items-center cursor-pointer group"
        onClick={() => setIsUsernameDialogOpen(true)}
        onKeyDown={(event) => {
          event.preventDefault();
          setIsUsernameDialogOpen(true);
        }}
        role="button"
        tabIndex={0}
      >
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Username</p>
        </div>
        <p className="ml-auto mr-2">{user.username}</p>
        <div className="group-hover:bg-zinc-100 rounded-full p-2">
          <ChevronRight />
        </div>
      </div>
      <div
        className="flex justify-between items-center cursor-pointer group"
        onClick={() => setIsEmailDialogOpen(true)}
        onKeyDown={(event) => {
          event.preventDefault();
          setIsEmailDialogOpen(true);
        }}
        role="button"
        tabIndex={-1}
      >
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Email</p>
        </div>
        <p className="ml-auto mr-2">{user.email}</p>
        <div className="group-hover:bg-zinc-100 rounded-full p-2">
          <ChevronRight />
        </div>
      </div>
      <div
        className="flex justify-between items-center cursor-pointer group"
        onClick={() => setIsPasswordDialogOpen(true)}
        onKeyDown={(event) => {
          event.preventDefault();
          setIsPasswordDialogOpen(true);
        }}
        role="button"
        tabIndex={-2}
      >
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
      <div
        className="flex justify-between items-center cursor-pointer group"
        onClick={() => setIsDeleteAccountDialogOpen(true)}
        onKeyDown={(event) => {
          event.preventDefault();
          setIsDeleteAccountDialogOpen(true);
        }}
        role="button"
        tabIndex={-3}
      >
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Delete account</p>
        </div>
        <div className="group-hover:bg-zinc-100 rounded-full p-2">
          <ChevronRight />
        </div>
      </div>
      <UsernameDialog
        user={user}
        open={isUsernameDialogOpen}
        onOpenChange={setIsUsernameDialogOpen}
      />
      <EmailDialog
        user={user}
        open={isEmailDialogOpen}
        onOpenChange={setIsEmailDialogOpen}
      />
      <DeleteAccountDialog
        user={user}
        open={isDeleteAccountDialogOpen}
        onOpenChange={setIsDeleteAccountDialogOpen}
      />
      <PasswordDialog
        user={user}
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
      />
    </div>
  );
}
