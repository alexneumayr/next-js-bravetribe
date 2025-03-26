import type { User } from '@prisma/client';

type Props = {
  friends: User[];
};

export default function MainFriendsContent({ friends }: Props) {
  return (
    <div>
      {friends.length > 0 ? (
        <div>
          {friends.map((friend) => {
            return (
              <div key={`id-${friend.id}`}>
                <p>{friend.username}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No friends added</div>
      )}
    </div>
  );
}
