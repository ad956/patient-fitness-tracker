import { motion } from "framer-motion";
import React from "react";

const MessageComponent = React.memo(
  ({
    message,
    currentUserId,
    onResend,
  }: {
    message: Message;
    currentUserId: string;
    onResend: (message: Message) => void;
  }) => {
    const isOwn = message.senderId._id === currentUserId;
    const isPending = message.status === "sending";
    const isFailed = message.status === "failed";

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`rounded-lg p-3 max-w-[80%] ${
            isOwn ? "bg-primary/10 ml-auto" : "bg-default-100 mr-auto"
          } ${isFailed ? "opacity-50" : ""}`}
        >
          <p className="text-small">{message.message}</p>
          <div className="flex items-center justify-end gap-2 mt-1">
            <span className="text-tiny text-default-400">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {isPending && (
              <span className="text-tiny text-primary">Sending...</span>
            )}
            {isFailed && (
              <button
                onClick={() => onResend(message)}
                className="text-tiny text-red-500 hover:text-red-600"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);

export default MessageComponent;
