import { Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  RiUserLine,
  RiTeamLine,
  RiCalendarLine,
  RiHospitalLine,
  RiEmotionSadLine,
} from "react-icons/ri";
import { ActivityType, RecentUser } from "@pft-types/index";

type RecentActivityProps = {
  recentUsers: RecentUser[];
  lastUserElementRef: (node: HTMLDivElement | null) => void;
};

const activityIcons: Record<ActivityType, JSX.Element> = {
  "New Patient Registered": <RiUserLine className="h-5 w-5" />,
  "New Doctor Registered": <RiTeamLine className="h-5 w-5" />,
  "New Hospital Registered": <RiHospitalLine className="h-5 w-5" />,
  "New Receptionist Registered": <RiCalendarLine className="h-5 w-5" />,
};

const activityColors: Record<ActivityType, string> = {
  "New Patient Registered": "bg-blue-100 text-blue-600",
  "New Doctor Registered": "bg-green-100 text-green-600",
  "New Hospital Registered": "bg-red-100 text-red-600",
  "New Receptionist Registered": "bg-purple-100 text-purple-600",
};

export default function RecentActivity({
  recentUsers,
  lastUserElementRef,
}: RecentActivityProps) {
  return (
    <Card className="bg-white shadow-lg h-[400px]">
      <CardHeader className="border-b border-gray-200 p-6">
        <h3 className="text-2xl font-semibold text-gray-800">
          Recent Activity
        </h3>
      </CardHeader>
      <CardBody className="p-6 overflow-y-auto scrollbar">
        <div className="space-y-6">
          {recentUsers.length > 0 ? (
            <div className="space-y-6">
              {recentUsers.map((user, index) => (
                <div
                  key={index}
                  ref={
                    index === recentUsers.length - 1 ? lastUserElementRef : null
                  }
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      activityColors[user.title]
                    }`}
                  >
                    {activityIcons[user.title]}
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-gray-900">{user.title}</p>
                    <p className="text-sm text-gray-600">{user.description}</p>
                  </div>
                  <p className="text-sm text-gray-500">{user.timeSince}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <RiEmotionSadLine className="h-16 w-16 text-gray-400 mb-4" />
              <p className="text-xl font-semibold text-gray-600">
                No Recent Activity
              </p>
              <p className="text-sm text-gray-500 mt-2">
                There are no recent user activities to display.
              </p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
