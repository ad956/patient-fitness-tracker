"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { pusherClient } from "@lib/pusher";
import {
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Image,
} from "@nextui-org/react";
import { LiaRedoAltSolid } from "react-icons/lia";
import { motion } from "framer-motion";
import { fetchRooms, loadMessages, readMessage, sendMessage } from "@lib/chats";
import toast, { Toaster } from "react-hot-toast";
import SpinnerLoader from "../SpinnerLoader";
import MessageComponent from "./Message";
import ChatInput from "./ChatInput";

const ChatScreen: React.FC<ChatScreenProps> = ({ currentUser }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [receivedMessages, setReceivedMessages] = useState<
    Record<string, Message[]>
  >({});
  const [sentMessages, setSentMessages] = useState<Record<string, Message[]>>(
    {}
  );
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [page, setPage] = useState(1);
  const [roomsError, setRoomsError] = useState("");
  const [loadingChats, setLoadingChats] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const messageList = useMemo(() => {
    if (!selectedRoom) return [];

    const sent = sentMessages[selectedRoom._id] || [];
    const received = receivedMessages[selectedRoom._id] || [];

    return [...sent, ...received].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [selectedRoom, sentMessages, receivedMessages]);

  const fetchRoomsData = async () => {
    setLoadingChats(true);
    setRoomsError("");
    try {
      const data = await fetchRooms({
        id: currentUser._id,
        role: currentUser.role,
      });
      setLoadingChats(false);
      setRooms(data);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
      setRoomsError("Failed to fetch chats");
      setLoadingChats(false);
    }
  };

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

        // separate messages into sent and received
        const sent: Message[] = [];
        const received: Message[] = [];

        data.forEach((msg) => {
          if (msg.senderId._id === currentUser._id) {
            sent.push({ ...msg, status: "sent" });
          } else {
            received.push(msg);
          }
        });

        if (reset) {
          setSentMessages((prev) => ({ ...prev, [roomId]: sent }));
          setReceivedMessages((prev) => ({ ...prev, [roomId]: received }));
        } else {
          setSentMessages((prev) => ({
            ...prev,
            [roomId]: [...sent, ...(prev[roomId] || [])],
          }));
          setReceivedMessages((prev) => ({
            ...prev,
            [roomId]: [...received, ...(prev[roomId] || [])],
          }));
        }

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

  const handleNewMessage = useCallback(
    (data: Message) => {
      if (!selectedRoom) return;

      // ignore messages that you sent
      if ((data.senderId as unknown as string) === currentUser._id) {
        console.log("Ignoring own message from Pusher");
        return;
      }
      setReceivedMessages((prev: any) => ({
        ...prev,
        [selectedRoom._id]: [...(prev[selectedRoom._id] || []), data],
      }));
    },
    [selectedRoom, currentUser._id]
  );

  const sendMsg = async (messageText: string) => {
    if (!selectedRoom) return;

    const messageId = Date.now().toString();
    const optimisticMessage = {
      _id: messageId,
      message: messageText,
      senderId: {
        _id: currentUser._id,
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        profile: currentUser.profile,
      },
      createdAt: new Date().toISOString(),
      roomId: selectedRoom._id,
      status: "sending",
    };

    // add optimistic message to sent messages
    setSentMessages((prev: any) => ({
      ...prev,
      [selectedRoom._id]: [
        ...(prev[selectedRoom._id] || []),
        optimisticMessage,
      ],
    }));

    try {
      await sendMessage({
        roomId: selectedRoom._id,
        senderId: currentUser._id,
        senderRole: currentUser.role,
        message: messageText,
      });

      // update the message status to sent
      setSentMessages((prev: any) => ({
        ...prev,
        [selectedRoom._id]: prev[selectedRoom._id].map((msg: any) =>
          msg._id === messageId ? { ...msg, status: "sent" } : msg
        ),
      }));
    } catch (error) {
      console.error("Failed to send message:", error);

      // update the message status to failed
      setSentMessages((prev) => ({
        ...prev,
        [selectedRoom._id]: prev[selectedRoom._id].map((msg: any) =>
          msg._id === messageId ? { ...msg, status: "failed" } : msg
        ),
      }));

      toast(
        (t) => (
          <div className="flex items-center gap-2">
            <span>Failed to send message</span>
            <button
              onClick={() => {
                resendMessage(optimisticMessage as any);
                toast.dismiss(t.id);
              }}
              className="px-2 py-1 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded"
            >
              Retry
            </button>
          </div>
        ),
        {
          duration: 4000,
        }
      );
    }
  };

  const resendMessage = async (failedMessage: Message) => {
    if (!selectedRoom) return;

    const messageId = failedMessage._id;

    // update message status to sending
    setSentMessages((prev) => ({
      ...prev,
      [selectedRoom._id]: prev[selectedRoom._id].map((msg) =>
        msg._id === messageId ? { ...msg, status: "sending" } : msg
      ),
    }));

    try {
      await sendMessage({
        roomId: selectedRoom._id,
        senderId: currentUser._id,
        senderRole: currentUser.role,
        message: failedMessage.message,
      });

      // update message status to sent
      setSentMessages((prev: any) => ({
        ...prev,
        [selectedRoom._id]: prev[selectedRoom._id].map((msg: any) =>
          msg._id === messageId ? { ...msg, status: "sent" } : msg
        ),
      }));

      toast.success("Message sent successfully");
    } catch (error) {
      // update message status to failed
      setSentMessages((prev: any) => ({
        ...prev,
        [selectedRoom._id]: prev[selectedRoom._id].map((msg: any) =>
          msg._id === messageId ? { ...msg, status: "failed" } : msg
        ),
      }));

      toast.error("Message failed to send");
    }
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    onOpen();
  };

  const getOtherParticipant = (room: Room) => {
    return room.participants.find((p) => p.userId._id !== currentUser._id)
      ?.userId;
  };

  useEffect(() => {
    fetchRoomsData();
  }, [currentUser]);

  useEffect(() => {
    if (!selectedRoom) return;

    loadMessagesData(selectedRoom._id, true);
    setPage(1);
    setHasMore(true);

    readMessage({
      roomId: selectedRoom._id,
      userId: currentUser._id,
    });

    const channel = pusherClient.subscribe(`chat-${selectedRoom._id}`);
    channel.bind("new-message", handleNewMessage);

    return () => {
      pusherClient.unsubscribe(`chat-${selectedRoom._id}`);
    };
  }, [selectedRoom]);

  if (loadingChats) {
    return <SpinnerLoader />;
  }

  if (rooms.length === 0) {
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
          <div className="ml-4 flex items-center gap-1">
            <p className="text-md font-medium text-gray-500">No Chats found.</p>
            <LiaRedoAltSolid
              className="cursor-pointer h-5 w-5 text-gray-500 hover:text-gray-600"
              onClick={fetchRoomsData}
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
                    <div className="flex-1 overflow-y-auto space-y-4 min-h-[300px] max-h-[400px] p-4 relative scrollbar">
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
                          {messageList.map((msg) => (
                            <MessageComponent
                              key={msg._id}
                              message={msg}
                              currentUserId={currentUser._id}
                              onResend={resendMessage}
                            />
                          ))}
                        </>
                      )}
                    </div>
                    <div className="p-4 border-t">
                      <ChatInput onSend={sendMsg} disabled={messagesLoading} />
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
