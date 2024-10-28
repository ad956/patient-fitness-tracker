"use client";

import React, { useState } from "react";
import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Image,
} from "@nextui-org/react";
import { FaPaperPlane } from "react-icons/fa6";
import useQuery from "@hooks/useQuery";
import getDoctorsChatList from "@lib/patient/getDoctorsChatList";
import SpinnerLoader from "@components/SpinnerLoader";
import { motion } from "framer-motion";
import { LiaRedoAltSolid } from "react-icons/lia";

interface DoctorChat {
  id: number;
  name: string;
  specialty: string;
  avatar: string;
  status: string;
  lastMessage: string;
  lastMessageTime: string;
}

// Chat Messages Component
const ChatMessages: React.FC<{ doctor: DoctorChat }> = ({ doctor }) => (
  <div className="flex-1 overflow-y-auto space-y-4 min-h-[300px] max-h-[400px] p-4">
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

// Chat Input Component
const ChatInput: React.FC<{
  message: string;
  onSend: (message: string) => void;
  onChange: (value: string) => void;
}> = ({ message, onSend, onChange }) => (
  <div className="p-4">
    <Input
      placeholder="Type a message..."
      value={message}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter" && message.trim()) {
          onSend(message);
        }
      }}
      endContent={
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          color="primary"
          onClick={() => message.trim() && onSend(message)}
        >
          <FaPaperPlane className="h-4 w-4" />
        </Button>
      }
    />
  </div>
);

// DoctorChat Component
const DoctorChat: React.FC = () => {
  const {
    data: doctors,
    isLoading,
    error,
    refetch,
  } = useQuery<DoctorChat[]>(getDoctorsChatList, []);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorChat | null>(null);
  const [message, setMessage] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // simulate sending a message
  const handleSendMessage = (messageText: string) => {
    if (!selectedDoctor || !doctors) return;

    const newMessage = {
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Create a new array with the updated doctor
    const updatedDoctors = doctors.map((doctor) =>
      doctor.id === selectedDoctor.id
        ? {
            ...doctor,
            lastMessage: messageText,
            lastMessageTime: newMessage.timestamp,
          }
        : doctor
    );

    // Find the updated doctor
    const updatedSelectedDoctor =
      updatedDoctors.find((d) => d.id === selectedDoctor.id) || null;
    setSelectedDoctor(updatedSelectedDoctor);
    setMessage("");
  };

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (error || !doctors?.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex justify-center items-center h-full w-full p-4 text-default-600"
      >
        <Image
          src="/images/404.jpg"
          width={200}
          height={100}
          alt="no-doctors-chat-list"
        />

        {error ? (
          <div className="ml-4 flex items-center gap-1">
            <p className="text-md font-medium text-red-500">{error}</p>
            <LiaRedoAltSolid
              className="cursor-pointer h-5 w-5 text-red-500 hover:text-red-600"
              onClick={refetch}
            />
          </div>
        ) : (
          <div className="ml-4 flex items-center gap-1">
            <p className="text-md font-medium text-gray-500">No chats found.</p>
            <LiaRedoAltSolid
              className="cursor-pointer h-5 w-5 text-gray-500 hover:text-gray-600"
              onClick={refetch}
            />
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="h-[178px] border-2 rounded-xl p-2 overflow-y-auto scrollbar">
      {/* Doctors List */}
      <div className="grid grid-cols-1 gap-2">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="p-4 hover:bg-default-100/50 cursor-pointer rounded-lg transition-colors"
            onClick={() => {
              setSelectedDoctor(doctor);
              onOpen();
            }}
          >
            <div className="flex items-center gap-3">
              <Avatar
                src={doctor.avatar}
                className="ring-2 ring-primary/20"
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-small truncate">
                    {doctor.name}
                  </p>
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

      {/* Chat Modal */}
      {selectedDoctor && (
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="3xl"
          scrollBehavior="inside"
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.3, ease: "easeOut" },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: { duration: 0.2, ease: "easeIn" },
              },
            },
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex items-center gap-4">
                  <Avatar
                    src={selectedDoctor.avatar}
                    className="ring-2 ring-primary/20"
                    size="sm"
                  />
                  <div>
                    <p className="font-semibold text-small">
                      {selectedDoctor.name}
                    </p>
                    <p className="text-tiny text-default-500">
                      {selectedDoctor.specialty}
                    </p>
                  </div>
                  {/* <Badge
                    color={getStatusColor(selectedDoctor.status)}
                    variant="flat"
                    size="sm"
                    className="ml-auto"
                  >
                    {selectedDoctor.status}
                  </Badge> */}
                </ModalHeader>
                <ModalBody className="p-0">
                  <ChatMessages doctor={selectedDoctor} />
                  <ChatInput
                    message={message}
                    onChange={setMessage}
                    onSend={handleSendMessage}
                  />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default DoctorChat;
