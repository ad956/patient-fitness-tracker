"use client";

import { CiBellOn } from "react-icons/ci";
import {
  NovuProvider,
  PopoverNotificationCenter,
} from "@novu/notification-center";

export default function Notifications({ patientId }: { patientId: string }) {
  return (
    <NovuProvider
      subscriberId={patientId}
      applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_IDENTIFIER || ""}
    >
      <PopoverNotificationCenter colorScheme={"light"}>
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
  return (
    <CiBellOn
      size={25}
      color={unseenCount > 0 ? "red" : "black"}
      style={{
        cursor: "pointer",
      }}
    >
      {unseenCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: "50%",
            right: "5px",
            transform: "translateY(-50%)",
            fontSize: "12px",
            color: "white",
            backgroundColor: "red",
            borderRadius: "50%",
            padding: "2px",
          }}
        >
          {unseenCount}
        </span>
      )}
    </CiBellOn>
  );
};
