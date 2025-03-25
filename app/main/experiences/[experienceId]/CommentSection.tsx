import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import { Separator } from '@/components/shadcn/separator';
import type { FullComment } from '@/types/types';
import levelNames from '@/util/levelNames';
import type { User } from '@prisma/client';
import Link from 'next/link';
import SingleComment from './SingleComment';

type Props = {
  comments: FullComment[];
  user: User;
};
export default function CommentSection({ comments, user }: Props) {
  return (
    <div id="comment-section">
      <div className="w-full">
        {Array.isArray(comments) &&
          comments.map((comment) => {
            return (
              <div key={`comment-${comment.id}`} className="">
                <div className="flex pb-2">
                  <div className="pt-4 pb-3  flex flex-col gap-1 items-center w-[150px] flex-none">
                    <Link href={`/main/profiles/${comment.user.id}`}>
                      <Avatar className="w-[65px] h-[65px]">
                        <AvatarImage src={`${comment.user.avatarImageUrl}`} />
                        <AvatarFallback>
                          {comment.user.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <Link
                      className="hover:underline"
                      href={`/main/profiles/${comment.user.id}`}
                    >
                      <p className="text-sm font-bold">
                        {comment.user.username}
                      </p>
                    </Link>
                    <p className="text-xs font-medium">
                      {levelNames(comment.user.experiences.length)}
                    </p>
                    <p className="text-xs font-medium">
                      {comment.user.experiences.length}
                      &nbsp;
                      {comment.user.experiences.length !== 1
                        ? 'challenges'
                        : 'challenge'}
                    </p>
                    <dl className="text-xs font-medium">
                      {comment.user.gender && (
                        <div className="flex justify-center flex-wrap gap-1">
                          <dt className="text-xs font-medium text-[#8d8d8d]">
                            Gender:
                          </dt>
                          <dd> {comment.user.gender}</dd>
                        </div>
                      )}
                      {comment.user.location && (
                        <div className="text-center">
                          <dt className="text-xs font-medium text-[#8d8d8d]">
                            Location:
                          </dt>
                          <dd> {comment.user.location}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                  <SingleComment comment={comment} user={user} />
                </div>
                <Separator className="" />
              </div>
            );
          })}
      </div>
    </div>
  );
}
