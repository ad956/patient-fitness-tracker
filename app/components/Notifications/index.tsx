"use client";

import { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import {
  NovuProvider,
  PopoverNotificationCenter,
} from "@novu/notification-center";

export default function Notifications({ userId }: { userId: string }) {
  return (
    <NovuProvider
      subscriberId={userId}
      applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_IDENTIFIER || ""}
    >
      <PopoverNotificationCenter colorScheme="light">
        {({ unseenCount }) => <CustomBellIcon unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
}

const CustomBellIcon = ({
  unseenCount = 0,
}: {
  unseenCount: number | undefined;
}) => {
  const [prevCount, setPrevCount] = useState(unseenCount);

  useEffect(() => {
    if (unseenCount > prevCount) {
      const audio = new Audio("/sounds/bell.mp3");
      audio.play();
    }
    setPrevCount(unseenCount);
  }, [unseenCount, prevCount]);

  return (
    <div className="relative inline-block">
      {/* Bell Icon with animation */}
      <div
        className={`transition-transform duration-300 ${
          unseenCount > 0 ? "animate-wiggle" : ""
        }`}
      >
        <IoNotificationsOutline
          size={25}
          className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200"
        />
      </div>

      {/* Notification Count */}
      {unseenCount > 0 && (
        <div className="absolute -top-2 -right-2 flex items-center justify-center">
          <span className="relative flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs font-bold items-center justify-center">
              {unseenCount > 99 ? "99+" : unseenCount}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};
