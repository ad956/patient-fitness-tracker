"use client";

import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";

export default function Notifications({ patientId }: { patientId: string }) {
  return (
    <NovuProvider
      subscriberId={patientId}
      applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_IDENTIFIER || ""}
    >
      <PopoverNotificationCenter colorScheme={"light"}>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
}
