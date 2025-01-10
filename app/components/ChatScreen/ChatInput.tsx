import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa6";

const ChatInput = React.memo(
  ({
    onSend,
    disabled,
  }: {
    onSend: (message: string) => void;
    disabled: boolean;
  }) => {
    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
      if (newMessage.trim() && !disabled) {
        onSend(newMessage);
        setNewMessage("");
      }
    };

    return (
      <Input
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        endContent={
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            color="primary"
            onClick={handleSend}
            disabled={disabled}
          >
            <FaPaperPlane className="h-4 w-4" />
          </Button>
        }
      />
    );
  }
);

export default ChatInput;
