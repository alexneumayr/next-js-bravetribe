import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import type { FullComment } from '@/types/types';
import { getTimeAgo } from '@/util/getTimeAgo';
import levelNames from '@/util/levelNames';
import Link from 'next/link';

type Props = {
  comments: FullComment[];
};
export default function CommentSection({ comments }: Props) {
  return (
    <div id="comment-section">
      <div className="w-full">
        {Array.isArray(comments) &&
          comments.map((comment) => {
            return (
              <div key={`comment-${comment.id}`} className="">
                <div className="flex">
                  <Link
                    href={`/main/profiles/${comment.user.id}`}
                    className="hover:bg-zinc-50 pt-4 pb-3  flex flex-col gap-1 items-center w-[150px] flex-none"
                  >
                    <Avatar className="w-[65px] h-[65px]">
                      <AvatarImage src={`${comment.user.avatarImageUrl}`} />
                      <AvatarFallback>
                        {comment.user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-bold">{comment.user.username}</p>
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
                  </Link>
                  <div className="space-y-1 px-2 pt-4 pb-2">
                    <p className="text-sm font-extralight">
                      {getTimeAgo(comment.createdAt)}
                    </p>

                    <p className="text-sm font-medium whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
                <Separator className="" />
              </div>
            );
          })}
      </div>
    </div>
  );
}
