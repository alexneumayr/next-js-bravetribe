import { Button } from '@/components/shadcn/button';
import type { Prisma, User } from '@prisma/client';
import { MessageSquareText } from 'lucide-react';
import AddFriendButton from './AddFriendButton';
import AnswerReceivedFriendRequestButton from './AnswerFriendRequestButton';
import CancelSentFriendRequestButton from './CancelSentFriendRequestButton';
import FriendsButton from './FriendsButton';

function getFriendshipStatus(
  user: Prisma.UserGetPayload<{
    include: {
      receivedFriendRequests: true;
      sentFriendRequests: true;
      experiences: true;
    };
  }>,
  currentUserId: User['id'],
) {
  const friendshipAsRequester = user.sentFriendRequests.find(
    (friend) => friend.receiverUserId === currentUserId && friend.isAccepted,
  );

  const friendshipAsReceiver = user.receivedFriendRequests.find(
    (friend) => friend.requesterUserId === currentUserId && friend.isAccepted,
  );

  const openFriendRequestAsRequester = user.sentFriendRequests.find(
    (friend) => friend.receiverUserId === currentUserId && !friend.isAccepted,
  );

  const openFriendRequestAsReceiver = user.receivedFriendRequests.find(
    (friend) => friend.requesterUserId === currentUserId && !friend.isAccepted,
  );

  if (friendshipAsRequester || friendshipAsReceiver) {
    return {
      friendshipStatus: 'friends',
      friendshipId: friendshipAsRequester?.id || friendshipAsReceiver?.id,
    };
  } else if (openFriendRequestAsRequester) {
    return {
      friendshipStatus: 'pending-requester',
      friendshipId: openFriendRequestAsRequester.id,
    };
  } else if (openFriendRequestAsReceiver) {
    return {
      friendshipStatus: 'pending-receiver',
      friendshipId: openFriendRequestAsReceiver.id,
    };
  } else {
    return { friendshipStatus: 'none' };
  }
}

type Props = {
  profileUser: Prisma.UserGetPayload<{
    include: {
      receivedFriendRequests: true;
      sentFriendRequests: true;
      experiences: true;
    };
  }>;
  currentUser: User;
};

export default function ProfileButtonsArea({
  profileUser,
  currentUser,
}: Props) {
  const { friendshipStatus, friendshipId } = getFriendshipStatus(
    profileUser,
    currentUser.id,
  );

  return (
    <div className="flex gap-5">
      {friendshipStatus === 'friends' ? (
        <FriendsButton friendId={profileUser.id} />
      ) : friendshipStatus === 'pending-receiver' ? (
        <CancelSentFriendRequestButton requestId={friendshipId || ''} />
      ) : friendshipStatus === 'pending-requester' ? (
        <AnswerReceivedFriendRequestButton requestId={friendshipId || ''} />
      ) : (
        <AddFriendButton receiverUserId={profileUser.id} />
      )}

      {/* Messaging functionality will be added later */}
      <Button variant="secondary">
        <MessageSquareText />
        Message
      </Button>
    </div>
  );
}
