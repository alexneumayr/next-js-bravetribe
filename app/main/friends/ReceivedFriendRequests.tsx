import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/alert';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import { Button } from '@/components/shadcn/button';
import { Check, Trash2, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function ReceivedFriendRequests({ receivedFriendRequests }) {
  return (
    <div>
      {receivedFriendRequests.map((friendRequest) => {
        return (
          <Alert
            key={`id-${friendRequest.id}`}
            className="mb-4 border-secondary"
          >
            <AlertTitle className="font-bold mb-2">
              New friend request
            </AlertTitle>
            <AlertDescription className="flex items-center gap-3">
              <Link href={`/main/profiles/${friendRequest.id}`}>
                <Avatar className=" w-[60px] h-[60px] cursor-pointer">
                  <AvatarImage
                    src={friendRequest.avatarImageUrl || undefined}
                  />
                  <AvatarFallback>
                    {friendRequest.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Link href={`/main/profiles/${friendRequest.id}`}>
                <p className="text-lg font-bold hover:underline">
                  {friendRequest.username}
                </p>
              </Link>
              <Button
                variant="secondary"
                size="icon"
                className="ml-auto sm:hidden"
              >
                <Check />
              </Button>
              <Button variant="secondary" className="ml-auto hidden sm:flex">
                Confirm request
              </Button>
              <Button size="icon" className="sm:hidden">
                <Trash2 />
              </Button>
              <Button className="hidden sm:flex">Remove request</Button>
            </AlertDescription>
          </Alert>
        );
      })}
    </div>
  );
}
