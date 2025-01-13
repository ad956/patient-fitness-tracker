interface User {
  _id: string;
  firstname: string;
  lastname: string;
  specialty?: string;
  profile?: string;
  role: "Patient" | "Doctor";
}

interface Message {
  _id: string;
  message: string;
  senderId: User;
  senderRole: "Patient" | "Doctor";
  createdAt: string;
  isRead: boolean;
  status: "sending" | "failed";
}

interface Room {
  _id: string;
  participants: {
    userId: User;
    role: "Patient" | "Doctor";
  }[];
  lastMessage?: Message;
}

interface ChatScreenProps {
  currentUser: User;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: Room;
  currentUser: User;
  messageList: Message[];
  messagesLoading: boolean;
  loadingMore: boolean;
  onSendMessage: (message: string) => void;
  onResend: (roomId: string, failedMessage: Message) => void;
}

interface ChatRoomListProps {
  rooms: Room[];
  currentUser: User;
  onRoomSelect: (room: Room) => void;
}

interface EmptyStateProps {
  roomsError: string;
  fetchRoomsData: () => void;
  setShowNewChatModal: () => void;
}

interface MessageComponentProps {
  message: Message;
  currentUserId: string;
  onResend: () => void;
}

interface ChatListUser {
  _id: string;
  firstname: string;
  lastname: string;
  profile: string;
}

interface StartNewChatProps {
  currentUserRole: string;
  onChatRoomCreated: () => void;
}

export {
  User,
  Message,
  Room,
  ChatScreenProps,
  ChatModalProps,
  ChatRoomListProps,
  EmptyStateProps,
  MessageComponentProps,
  ChatListUser,
  StartNewChatProps,
};
