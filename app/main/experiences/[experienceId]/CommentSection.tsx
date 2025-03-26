import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';
import { Separator } from '@/components/shadcn/separator';
import type { FullComment } from '@/types/types';
import { getTimeAgo } from '@/util/getTimeAgo';
import levelNames from '@/util/levelNames';
import type { User } from '@prisma/client';
import Link from 'next/link';
import SingleCommentContent from './SingleCommentContent';

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
              <div key={`comment-${comment.id}`} className="relative">
                <div className="flex flex-col sm:flex-row pb-2">
                  <div className=" pt-4 sm:pb-3 flex-row  flex sm:flex-col gap-2 sm:gap-1 items-center sm:w-[150px] flex-none w-full">
                    <Link href={`/main/profiles/${comment.user.id}`}>
                      <Avatar className="w-[30px] h-[30px] sm:w-[65px] sm:h-[65px]">
                        <AvatarImage src={comment.user.avatarImageUrl || ''} />
                        <AvatarFallback className="text-xs sm:text-[16px]">
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
                      <p className="text-xs font-extralight sm:hidden">
                        {getTimeAgo(comment.createdAt)}
                      </p>
                    </Link>
                    <p className="textext-xs font-medium hidden sm:block">
                      {levelNames(comment.user.experiences.length)}
                    </p>
                    <p className="text-xs font-medium hidden sm:block">
                      {comment.user.experiences.length}
                      &nbsp;
                      {comment.user.experiences.length !== 1
                        ? 'challenges'
                        : 'challenge'}
                    </p>
                    <dl className="text-xs font-medium hidden sm:block">
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
                  <SingleCommentContent comment={comment} user={user} />
                </div>
                <Separator className="" />
              </div>
            );
          })}
      </div>
    </div>
  );
}
