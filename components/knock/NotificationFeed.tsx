'use client';
// Required CSS import, unless you're overriding the styling
import '@knocklabs/react/dist/index.css';
import {
  KnockFeedProvider,
  KnockProvider,
  NotificationFeedPopover,
  NotificationIconButton,
} from '@knocklabs/react';
import type { User } from '@prisma/client';
import { useRef, useState } from 'react';

type Props = {
  user: User;
};

const NotificationFeed = ({ user }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <KnockProvider
      apiKey={String(process.env.NEXT_PUBLIC_KNOCK_API_KEY)}
      userId={user.id}
    >
      <KnockFeedProvider
        feedId={String(process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID)}
      >
        <>
          <div className="scale-75 sm:scale-100 -mr-2 sm:-mr-4 xl:mr-0 hover:bg-zinc-100 rounded-md sm:rounded-full sm:p-2 p-[5px] transition-colors">
            <NotificationIconButton
              ref={notifButtonRef}
              onClick={() => setIsVisible(!isVisible)}
            />
          </div>
          <NotificationFeedPopover
            buttonRef={notifButtonRef as React.RefObject<HTMLElement>}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>
  );
};

export default NotificationFeed;
