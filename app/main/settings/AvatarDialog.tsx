import { updateUserAction } from '@/actions/userActions';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import { Button } from '@/components/shadcn/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';
import { Input } from '@/components/shadcn/input';
import type { User } from '@prisma/client';
import { CldUploadWidget } from 'next-cloudinary';
import React, { useActionState, useEffect, useState } from 'react';

type Props = {
  user: User;
  openDialog: boolean;
  onOpenDialogChange: (status: boolean) => void;
};

type UploadResult = {
  event: 'success';
  info: {
    secure_url: string;
  };
};

export default function AvatarDialog({
  user,
  openDialog,
  onOpenDialogChange,
}: Props) {
  const [imageUrl, setImageUrl] = useState(user.avatarImageUrl || undefined);

  useEffect(() => {
    // Disable Radix ui dialog pointer events lockout
    setTimeout(() => (document.body.style.pointerEvents = ''), 0);
  });

  const initialState = {
    success: false,
    error: {},
  };

  const [state, formAction, pending] = useActionState(
    updateUserAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      onOpenDialogChange(false);
    }
  }, [state, onOpenDialogChange]);

  return (
    <Dialog open={openDialog} onOpenChange={onOpenDialogChange}>
      <DialogContent
        className="max-w-[425px] [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            <p className="font-semibold text-2xl">Avatar</p>
            <p className="text-zinc-500 text-sm font-medium">
              Here you can choose your avatar.
            </p>
          </DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <div className="flex items-center justify-around">
            <Avatar className="w-[100px] h-[100px] cursor-pointer mt-2">
              <AvatarImage src={imageUrl} />
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CldUploadWidget
              onError={(error) => console.log(error)}
              signatureEndpoint="/api/sign-image"
              uploadPreset="bravetribe-experience-photos"
              onSuccess={(results) => {
                const uploadResults = results as UploadResult;
                setImageUrl(uploadResults.info.secure_url);
              }}
              options={{
                sources: ['local'],
                cropping: true, // Zuschneiden aktivieren
                croppingAspectRatio: 1, // 1:1 für quadratischen Ausschnitt
                showSkipCropButton: false,
                multiple: false,
                maxFileSize: 1024 * 1024 * 5,
              }}
            >
              {({ open }) => {
                return (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => open()}
                    className="w-[134px]"
                  >
                    {!imageUrl ? 'Upload picture' : 'Change picture'}
                  </Button>
                );
              }}
            </CldUploadWidget>
          </div>
          <Input
            name="avatarImageUrl"
            value={imageUrl}
            className="mt-3"
            type="hidden"
          />
          {state.error?.avatarImageUrl && (
            <p className="text-red-500 font-bold text-center">
              {state.error.avatarImageUrl}
            </p>
          )}
          <Input
            name="id"
            value={user.id}
            className="mt-3"
            readOnly
            type="hidden"
          />
          {state.error?.id && (
            <p className="text-red-500 font-bold text-center">
              {state.error.id}
            </p>
          )}
          <div className="flex justify-around w-full gap-x-2 mt-8">
            <Button
              variant="secondary"
              disabled={pending}
              className="w-full"
              type="submit"
            >
              Save
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="w-full" type="button">
                Cancel
              </Button>
            </DialogClose>
          </div>
          {state.error?.general && (
            <p className="text-red-500 font-bold ">{state.error.general}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
