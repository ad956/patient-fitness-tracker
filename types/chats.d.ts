type ChatUser = {
  _id: string;
  firstname: string;
  lastname: string;
  specialty?: string;
  profile?: string;
  role: "Patient" | "Doctor";
};

type Message = {
  _id: string;
  message: string;
  senderId: User;
  senderRole: "Patient" | "Doctor";
  createdAt: string;
  isRead: boolean;
  status: "sending" | "failed";
};

type Room = {
  _id: string;
  participants: {
    userId: ChatUser;
    role: "Patient" | "Doctor";
  }[];
  lastMessage?: Message;
};

type ChatScreenProps = {
  currentUser: ChatUser;
};

type ChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: Room;
  currentUser: ChatUser;
  messageList: Message[];
  messagesLoading: boolean;
  loadingMore: boolean;
  onSendMessage: (message: string) => void;
  onResend: (roomId: string, failedMessage: Message) => void;
};

type ChatRoomListProps = {
  rooms: Room[];
  currentUser: ChatUser;
  onRoomSelect: (room: Room) => void;
};

type EmptyStateProps = {
  roomsError: string;
  fetchRoomsData: () => void;
  setShowNewChatModal: () => void;
};

type MessageComponentProps = {
  message: Message;
  currentUserId: string;
  onResend: () => void;
};

type ChatListUser = {
  _id: string;
  firstname: string;
  lastname: string;
  profile: string;
};

type StartNewChatProps = {
  currentUserRole: string;
  onChatRoomCreated: () => void;
};
