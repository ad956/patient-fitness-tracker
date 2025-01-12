"use client";

import React, { useState, useEffect, useMemo } from "react";
import { pusherClient } from "@lib/pusher";
import { useDisclosure } from "@nextui-org/react";
import { readMessage } from "@lib/chats";
import { Toaster } from "react-hot-toast";
import { ChatScreenProps, Room } from "@pft-types/chats";
import useChat from "@hooks/useChat";
import SpinnerLoader from "../SpinnerLoader";
import StartNewChat from "./StartNewChat";
import ChatRoomList from "./ChatRoomList";
import EmptyState from "./EmptyState";
import { ChatModal } from "./ChatModal";

const ChatScreen: React.FC<ChatScreenProps> = ({ currentUser }) => {
  const {
    rooms,
    receivedMessages,
    sentMessages,
    loadingChats,
    messagesLoading,
    loadingMore,
    hasMore,
    resendMessage,
    roomsError,
    fetchRoomsData,
    loadMessagesData,
    sendMsg,
    handleNewMessage,
  } = useChat(currentUser);

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refreshKey, setRefreshKey] = useState(0);

  const messageList = useMemo(() => {
    if (!selectedRoom) return [];

    const sent = sentMessages[selectedRoom._id] || [];
    const received = receivedMessages[selectedRoom._id] || [];

    return [...sent, ...received].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [selectedRoom, sentMessages, receivedMessages]);

  const refreshChatList = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    onOpen();
  };

  useEffect(() => {
    fetchRoomsData();
  }, [currentUser, refreshKey]);

  useEffect(() => {
    if (!selectedRoom) return;

    loadMessagesData(selectedRoom._id, true);
    readMessage(selectedRoom._id);

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
      <>
        {!showNewChatModal ? (
          <EmptyState
            roomsError={roomsError}
            fetchRoomsData={fetchRoomsData}
            setShowNewChatModal={() => setShowNewChatModal(true)}
          />
        ) : (
          <StartNewChat
            currentUserRole={currentUser.role}
            onChatRoomCreated={refreshChatList}
          />
        )}
      </>
    );
  }

  return (
    <div className="h-full border-2 rounded-xl p-2 overflow-y-auto scrollbar">
      <div className="px-4 py-2 flex justify-between items-center border-b">
        <h2 className="text-sm font-semibold text-gray-700">Recent Chats</h2>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
          {rooms.length} Chats
        </span>
      </div>

      <ChatRoomList
        rooms={rooms}
        currentUser={currentUser}
        onRoomSelect={handleRoomSelect}
      />

      {selectedRoom && (
        <ChatModal
          isOpen={isOpen}
          onClose={onClose}
          selectedRoom={selectedRoom}
          currentUser={currentUser}
          messageList={messageList}
          messagesLoading={messagesLoading}
          loadingMore={loadingMore}
          onSendMessage={(message) => sendMsg(selectedRoom._id, message)}
          onResend={resendMessage}
        />
      )}
      <Toaster />
    </div>
  );
};

export default ChatScreen;
