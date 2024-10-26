"use client";

import { Avatar, Badge, Button, Input } from "@nextui-org/react";
import { DoctorChat } from "@pft-types/patient";
import { FaArrowLeft } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa6";

interface ChatHeaderProps {
  doctor: DoctorChat;
  onBack: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ doctor, onBack }) => (
  <div className="flex-none p-4 border-b border-divider">
    <div className="flex items-center gap-4">
      <Button isIconOnly size="sm" variant="light" onClick={onBack}>
        <FaArrowLeft className="h-4 w-4" />
      </Button>
      <Avatar
        src={doctor.avatar}
        className="ring-2 ring-primary/20"
        size="sm"
      />
      <div>
        <p className="font-semibold text-small">{doctor.name}</p>
        <p className="text-tiny text-default-500">{doctor.specialty}</p>
      </div>
      <Badge
        color={getStatusColor(doctor.status)}
        variant="flat"
        size="sm"
        className="ml-auto"
      >
        {doctor.status}
      </Badge>
    </div>
  </div>
);

type StatusColor = "success" | "warning" | "primary" | "default";

const getStatusColor = (status: string): StatusColor => {
  const statusColors: Record<string, StatusColor> = {
    completed: "success",
    pending: "warning",
    processing: "primary",
    online: "success",
    offline: "default",
  };
  return statusColors[status.toLowerCase()] || "default";
};

interface ChatMessagesProps {
  doctor: DoctorChat;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ doctor }) => (
  <div className="flex-1 overflow-y-auto p-4 space-y-4">
    <div className="bg-default-100 rounded-lg p-3 ml-auto max-w-[80%]">
      <p className="text-small">
        Hi {doctor.name}, I had a question about my recent test results.
      </p>
      <p className="text-tiny text-default-400 mt-1">10:25 AM</p>
    </div>
    <div className="bg-primary/10 rounded-lg p-3 mr-auto max-w-[80%]">
      <p className="text-small">{doctor.lastMessage}</p>
      <p className="text-tiny text-default-400 mt-1">
        {doctor.lastMessageTime}
      </p>
    </div>
  </div>
);

interface ChatInputProps {
  message: string;
  onChange: (value: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ message, onChange }) => (
  <div className="flex-none p-4 border-t border-divider">
    <Input
      placeholder="Type a message..."
      value={message}
      onChange={(e) => onChange(e.target.value)}
      endContent={
        <Button isIconOnly size="sm" variant="flat" color="primary">
          <FaPaperPlane className="h-4 w-4" />
        </Button>
      }
    />
  </div>
);

interface DoctorsListProps {
  doctors: DoctorChat[];
  onSelectDoctor: (doctor: DoctorChat) => void;
}

export const DoctorsList: React.FC<DoctorsListProps> = ({
  doctors,
  onSelectDoctor,
}) => (
  <div className="h-[178px] border-2 rounded-xl p-2 overflow-y-auto scrollbar">
    {doctors.map((doctor) => (
      <div
        key={doctor.id}
        className="p-4 hover:bg-default-100/50 cursor-pointer border-b border-divider"
        onClick={() => onSelectDoctor(doctor)}
      >
        <div className="flex items-center gap-3">
          <Avatar
            src={doctor.avatar}
            className="ring-2 ring-primary/20"
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-small truncate">{doctor.name}</p>
              {/* <Badge
                color={getStatusColor(doctor.status)}
                variant="flat"
                size="sm"
              >
                {doctor.status}
              </Badge> */}
            </div>
            <p className="text-tiny text-default-500">{doctor.specialty}</p>
            <p className="text-tiny text-default-400 truncate mt-1">
              {doctor.lastMessage}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

interface ChatViewProps {
  doctor: DoctorChat;
  message: string;
  onMessageChange: (value: string) => void;
  onBack: () => void;
}

const ChatView: React.FC<ChatViewProps> = ({
  doctor,
  message,
  onMessageChange,
  onBack,
}) => (
  <div className="h-full flex flex-col">
    <ChatHeader doctor={doctor} onBack={onBack} />
    <ChatMessages doctor={doctor} />
    <ChatInput message={message} onChange={onMessageChange} />
  </div>
);

export default ChatView;
