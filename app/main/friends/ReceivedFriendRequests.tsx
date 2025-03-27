import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/alert';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import { Button } from '@/components/shadcn/button';
import { Check, Trash2, UserPlus } from 'lucide-react';
import Link from 'next/link';
import ConfirmFriendRequestButton from './ConfirmFriendRequestButton';
import RemoveFriendRequestButton from './RemoveFriendRequestButton';

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
              <Link href={`/main/profiles/${friendRequest.requesterUser.id}`}>
                <Avatar className=" w-[60px] h-[60px] cursor-pointer">
                  <AvatarImage
                    src={
                      friendRequest.requesterUser.avatarImageUrl || undefined
                    }
                  />
                  <AvatarFallback>
                    {friendRequest.requesterUser.username
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Link href={`/main/profiles/${friendRequest.requesterUser.id}`}>
                <p className="text-lg font-bold hover:underline">
                  {friendRequest.requesterUser.username}
                </p>
              </Link>
              <ConfirmFriendRequestButton requestId={friendRequest.id} />
              <RemoveFriendRequestButton requestId={friendRequest.id} />
            </AlertDescription>
          </Alert>
        );
      })}
    </div>
  );
}
