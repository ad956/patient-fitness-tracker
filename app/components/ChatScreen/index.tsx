"use client";

import React, { useState, useEffect } from "react";
import { pusherClient } from "@lib/pusher";
import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { FaPaperPlane } from "react-icons/fa6";
import { motion } from "framer-motion";
import getRoomId from "@utils/getRoomId";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  specialty?: string;
  profile?: string;
  role: "doctor" | "patient";
}

interface Message {
  _id: string;
  message: string;
  senderId: {
    id: string;
    role: "doctor" | "patient";
  };
  createdAt: string;
}

interface ChatScreenProps {
  currentUser: User;
  chatList: User[];
}

const ChatScreen: React.FC<ChatScreenProps> = ({ currentUser, chatList }) => {
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loadMessages = async (roomId: string, reset = false) => {
    const currentPage = reset ? 1 : page;
    const response = await fetch(
      `/api/chat?roomId=${roomId}&page=${currentPage}&limit=50`
    );
    const data = await response.json();

    if (Array.isArray(data)) {
      if (data.length < 50) {
        setHasMore(false);
      }
      setMessages((prev) => ({
        ...prev,
        [roomId]: reset ? data : [...(prev[roomId] || []), ...data],
      }));
      if (!reset) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (!selectedUser) return;

    const roomId = getRoomId(currentUser.id, selectedUser.id);
    loadMessages(roomId, true);
    setPage(1);
    setHasMore(true);

    const channel = pusherClient.subscribe(`chat-${roomId}`);
    channel.bind("new-message", (data: Message) => {
      setMessages((prev) => ({
        ...prev,
        [roomId]: [...(prev[roomId] || []), data],
      }));
    });

    return () => {
      pusherClient.unsubscribe(`chat-${roomId}`);
    };
  }, [selectedUser]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    const roomId = getRoomId(currentUser.id, selectedUser.id);
    const messageData = {
      message: newMessage,
      senderId: {
        id: currentUser.id,
        role: currentUser.role,
      },
      roomId,
    };

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });

      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.scrollTop === 0 && hasMore && selectedUser) {
      const roomId = getRoomId(currentUser.id, selectedUser.id);
      loadMessages(roomId);
    }
  };

  return (
    <div className="h-[178px] border-2 rounded-xl p-2 overflow-y-auto scrollbar">
      <div className="px-4 py-2 flex justify-between items-center border-b">
        <h2 className="text-sm font-semibold text-gray-700">Recent Chats</h2>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
          {chatList.length} Chats
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {chatList.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeIn" }}
            className="p-4 hover:bg-default-100/50 cursor-pointer rounded-lg transition-colors"
            onClick={() => handleUserSelect(user)}
          >
            <div className="flex items-center gap-3">
              <Avatar
                src={user.profile || "/placeholder-avatar.png"}
                className="ring-2 ring-primary/20"
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-small truncate">
                  {user.firstname} {user.lastname}
                </p>
                {user.specialty && (
                  <p className="text-tiny text-default-500">{user.specialty}</p>
                )}
                {selectedUser &&
                  messages[getRoomId(currentUser.id, user.id)]?.length > 0 && (
                    <p className="text-tiny text-default-400 truncate mt-1">
                      {
                        messages[getRoomId(currentUser.id, user.id)].slice(
                          -1
                        )[0].message
                      }
                    </p>
                  )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedUser && (
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onClose}
          size="3xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            <ModalHeader className="flex items-center gap-4">
              <Avatar
                src={selectedUser.profile || "/placeholder-avatar.png"}
                className="ring-2 ring-primary/20"
                size="sm"
              />
              <div>
                <p className="font-semibold text-small">
                  {selectedUser.firstname} {selectedUser.lastname}
                </p>
                {selectedUser.specialty && (
                  <p className="text-tiny text-default-500">
                    {selectedUser.specialty}
                  </p>
                )}
              </div>
            </ModalHeader>
            <ModalBody className="p-0">
              <div
                className="flex-1 overflow-y-auto space-y-4 min-h-[300px] max-h-[400px] p-4"
                onScroll={handleScroll}
              >
                {messages[getRoomId(currentUser.id, selectedUser.id)]?.map(
                  (msg, index) => (
                    <div
                      key={msg._id || index}
                      className={`flex ${
                        msg.senderId.id === currentUser.id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg p-3 max-w-[80%] ${
                          msg.senderId.id === currentUser.id
                            ? "bg-primary/10 ml-auto"
                            : "bg-default-100 mr-auto"
                        }`}
                      >
                        <p className="text-small">{msg.message}</p>
                        <p className="text-tiny text-default-400 mt-1">
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="p-4 border-t">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && newMessage.trim()) {
                      sendMessage();
                    }
                  }}
                  endContent={
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      color="primary"
                      onClick={() => newMessage.trim() && sendMessage()}
                    >
                      <FaPaperPlane className="h-4 w-4" />
                    </Button>
                  }
                />
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default ChatScreen;
