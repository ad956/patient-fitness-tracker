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
