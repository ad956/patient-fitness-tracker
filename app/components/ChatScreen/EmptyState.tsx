import { motion } from "framer-motion";
import React from "react";
import { Button, Image } from "@nextui-org/react";
import { LiaRedoAltSolid } from "react-icons/lia";
import { EmptyStateProps } from "@pft-types/chats";

export default function EmptyState({
  roomsError,
  fetchRoomsData,
  setShowNewChatModal,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="flex justify-center items-center h-full w-full p-4 text-default-600"
    >
      <Image
        src="/images/chats.png"
        width={150}
        height={100}
        alt="no-pending-bills"
      />
      {roomsError ? (
        <div className="ml-4 flex items-center gap-1">
          <p className="text-md font-medium text-red-500">{roomsError}</p>
          <LiaRedoAltSolid
            className="cursor-pointer h-5 w-5 text-red-500 hover:text-red-600"
            onClick={fetchRoomsData}
          />
        </div>
      ) : (
        <div className="ml-4 flex flex-col items-center gap-4">
          <p className="text-md font-medium text-gray-500">
            No chats found. Start a new conversation!
          </p>

          <Button
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 text-sm font-semibold rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-300"
            onClick={() => setShowNewChatModal()}
          >
            <Image
              src="/icons/message.png"
              alt="Chat Icon"
              className="w-5 h-5"
            />
            Start a New Chat
          </Button>
        </div>
      )}
    </motion.div>
  );
}
