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
  Image,
} from "@nextui-org/react";
import { FaPaperPlane } from "react-icons/fa6";
import { motion } from "framer-motion";
import { fetchRooms, loadMessages, readMessage, sendMessage } from "@lib/chats";
import toast, { Toaster } from "react-hot-toast";
import SpinnerLoader from "../SpinnerLoader";
import { LiaRedoAltSolid } from "react-icons/lia";

const ChatScreen: React.FC<ChatScreenProps> = ({ currentUser }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [newMessage, setNewMessage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [page, setPage] = useState(1);
  const [roomsError, SetRoomsError] = useState("");
  const [loadingChats, SetLoadingChats] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sentMessageIds] = useState(new Set<string>());

  // fetch rooms
  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const data = await fetchRooms({
          id: currentUser._id,
          role: currentUser.role,
        });
        SetLoadingChats(false);
        setRooms(data);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        SetRoomsError("Failed to fetch chats");
      }
    };

    fetchRoomsData();
  }, [currentUser]);

  const loadMessagesData = async (roomId: string, reset = false) => {
    try {
      if (reset) {
        setMessagesLoading(true);
      } else {
        setLoadingMore(true);
      }
      const currentPage: any = reset ? 1 : page;

      const data = await loadMessages(roomId, currentPage);

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
    } catch (error) {
      console.error("Failed to load messages:", error);
      toast.error("Error loading messages");
    } finally {
      setMessagesLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (!selectedRoom) return;

    loadMessagesData(selectedRoom._id, true);
    setPage(1);
    setHasMore(true);

    // mark messages as read
    readMessage({
      roomId: selectedRoom._id,
      userId: currentUser._id,
    });

    const channel = pusherClient.subscribe(`chat-${selectedRoom._id}`);
    channel.bind("new-message", (data: Message) => {
      if (sentMessageIds.has(data._id)) {
        return;
      }

      const enhancedMessage = {
        ...data,
        senderId:
          data.senderId._id === currentUser._id
            ? {
                _id: currentUser._id,
                firstname: currentUser.firstname,
                lastname: currentUser.lastname,
                profile: currentUser.profile,
              }
            : data.senderId,
      };

      setMessages((prev: any) => ({
        ...prev,
        [selectedRoom._id]: [
          ...(prev[selectedRoom._id] || []),
          enhancedMessage,
        ],
      }));
    });

    return () => {
      pusherClient.unsubscribe(`chat-${selectedRoom._id}`);
    };
  }, [selectedRoom]);

  const sendMsg = async () => {
    if (!newMessage.trim() || !selectedRoom) return;

    const messageId = Date.now().toString();
    const optimisticMessage = {
      _id: messageId,
      message: newMessage.trim(),
      senderId: {
        _id: currentUser._id,
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        profile: currentUser.profile,
      },
      createdAt: new Date().toISOString(),
      roomId: selectedRoom._id,
    };

    // Add the optimistic message to the UI
    setMessages((prev: any) => ({
      ...prev,
      [selectedRoom._id]: [
        ...(prev[selectedRoom._id] || []),
        optimisticMessage,
      ],
    }));

    sentMessageIds.add(messageId);
    setNewMessage("");

    try {
      // Send the actual message to the server
      await sendMessage({
        roomId: selectedRoom._id,
        senderId: currentUser._id,
        senderRole: currentUser.role,
        message: optimisticMessage.message,
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Retrying...");

      // Retry the message sending
      setTimeout(async () => {
        try {
          await sendMessage({
            roomId: selectedRoom._id,
            senderId: currentUser._id,
            senderRole: currentUser.role,
            message: optimisticMessage.message,
          });
          toast.success("Message sent successfully after retry.");
        } catch (retryError) {
          console.error("Retry failed:", retryError);
          toast.error("Message could not be sent.");

          // remove the failed optimistic message
          setMessages((prev: any) => ({
            ...prev,
            [selectedRoom._id]: prev[selectedRoom._id].filter(
              (msg: Message) => msg._id !== messageId
            ),
          }));
        }
      }, 3000); // retry after 3 seconds
    }
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    onOpen();
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.scrollTop === 0 && hasMore && selectedRoom && !loadingMore) {
      loadMessagesData(selectedRoom._id);
    }
  };

  const getOtherParticipant = (room: Room) => {
    return room.participants.find((p) => p.userId._id !== currentUser._id)
      ?.userId;
  };

  if (loadingChats) {
    return <SpinnerLoader />;
  }

  if (rooms.length == 0) {
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
              onClick={() => window.location.reload()}
            />
          </div>
        ) : (
          <div className="ml-4 flex items-center gap-1">
            <p className="text-md font-medium text-gray-500">No Chats found.</p>
            <LiaRedoAltSolid
              className="cursor-pointer h-5 w-5 text-gray-500 hover:text-gray-600"
              onClick={() => window.location.reload()}
            />
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="h-[178px] border-2 rounded-xl p-2 overflow-y-auto scrollbar">
      <div className="px-4 py-2 flex justify-between items-center border-b">
        <h2 className="text-sm font-semibold text-gray-700">Recent Chats</h2>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
          {rooms.length} Chats
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {rooms.map((room) => {
          const otherUser = getOtherParticipant(room);
          if (!otherUser) return null;

          return (
            <motion.div
              key={room._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeIn" }}
              className="p-4 hover:bg-default-100/50 cursor-pointer rounded-lg transition-colors"
              onClick={() => handleRoomSelect(room)}
            >
              <div className="flex items-center gap-3">
                <Avatar
                  src={otherUser.profile || "/placeholder-avatar.png"}
                  className="ring-2 ring-primary/20"
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-small truncate">
                    {`${otherUser.firstname} ${otherUser.lastname}`}
                  </p>
                  {otherUser.specialty && (
                    <p className="text-tiny text-default-500">
                      {otherUser.specialty}
                    </p>
                  )}
                  {room.lastMessage && (
                    <p className="text-tiny text-default-400 truncate mt-1">
                      {room.lastMessage.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedRoom && (
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onClose}
          size="3xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            {() => {
              const otherUser = getOtherParticipant(selectedRoom);
              if (!otherUser) return null;

              return (
                <>
                  <ModalHeader className="flex items-center gap-4">
                    <Avatar
                      src={otherUser.profile}
                      className="ring-2 ring-primary/20"
                      size="sm"
                    />
                    <div>
                      <p className="font-semibold text-small">
                        {`${otherUser.firstname} ${otherUser.lastname}`}
                      </p>
                      {otherUser.specialty && (
                        <p className="text-tiny text-default-500">
                          {otherUser.specialty}
                        </p>
                      )}
                    </div>
                  </ModalHeader>
                  <ModalBody className="p-0">
                    <div
                      className="flex-1 overflow-y-auto space-y-4 min-h-[300px] max-h-[400px] p-4 relative scrollbar"
                      onScroll={handleScroll}
                    >
                      {messagesLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-default-100/50">
                          <SpinnerLoader />
                        </div>
                      ) : (
                        <>
                          {loadingMore && (
                            <div className="flex justify-center py-2">
                              <SpinnerLoader />
                            </div>
                          )}
                          {messages[selectedRoom._id]?.map((msg, index) => (
                            <div
                              key={msg._id || index}
                              className={`flex ${
                                msg.senderId._id === currentUser._id
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                            >
                              <div
                                className={`rounded-lg p-3 max-w-[80%] ${
                                  msg.senderId._id === currentUser._id
                                    ? "bg-primary/10 ml-auto"
                                    : "bg-default-100 mr-auto"
                                }`}
                              >
                                <p className="text-small">{msg.message}</p>
                                <p className="text-tiny text-default-400 mt-1">
                                  {new Date(msg.createdAt).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </p>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                    <div className="p-4 border-t">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && newMessage.trim()) {
                            sendMsg();
                          }
                        }}
                        endContent={
                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            color="primary"
                            onClick={() => newMessage.trim() && sendMsg()}
                          >
                            <FaPaperPlane className="h-4 w-4" />
                          </Button>
                        }
                      />
                    </div>
                  </ModalBody>
                </>
              );
            }}
          </ModalContent>
        </Modal>
      )}

      <Toaster />
    </div>
  );
};

export default ChatScreen;
