type FriendRequestStatus = "pending" | "accepted" | "rejected";
type MessageReadStatus = "unread" | "read";
type ConversationType = "private" | "group" | "channel";
type NotificationType = "friend_request" | "message" | "mention" | "system";
type SessionStatus = "active" | "inactive";
type ConversationMemberRole = "member" | "admin" | "owner";

export type AllowedValues = {
  FriendRequestStatus: FriendRequestStatus[];
  MessageReadStatus: MessageReadStatus[];
  ConversationType: ConversationType[];
  NotificationType: NotificationType[];
  SessionStatus: SessionStatus[];
  ConversationMemberRole: ConversationMemberRole[];
};

export const allowedValues: AllowedValues = {
  FriendRequestStatus: ["pending", "accepted", "rejected"],
  MessageReadStatus: ["unread", "read"],
  ConversationType: ["private", "group"],
  NotificationType: ["friend_request", "message", "mention", "system"],
  SessionStatus: ["active", "inactive"],
  ConversationMemberRole: ["member", "admin", "owner"],
};

type StaticValue<K extends keyof AllowedValues> = {
  key: K;
  value: AllowedValues[K][number];
  description: string;
};

// All possible static values, respecting the key-value structure
export const allStaticsValues: StaticValue<keyof AllowedValues>[] = [
  { key: "FriendRequestStatus", value: "pending", description: "Request is pending" },
  { key: "FriendRequestStatus", value: "accepted", description: "Request has been accepted" },
  { key: "FriendRequestStatus", value: "rejected", description: "Request has been rejected" },

  { key: "MessageReadStatus", value: "unread", description: "Message is unread" },
  { key: "MessageReadStatus", value: "read", description: "Message has been read" },

  { key: "ConversationType", value: "private", description: "Private conversation between two users" },
  { key: "ConversationType", value: "group", description: "Group conversation with multiple members" },

  { key: "NotificationType", value: "friend_request", description: "Notification for a friend request" },
  { key: "NotificationType", value: "message", description: "Notification for a new message" },
  { key: "NotificationType", value: "mention", description: "Notification for a mention" },
  { key: "NotificationType", value: "system", description: "System-related notification" },

  { key: "SessionStatus", value: "active", description: "Session is currently active" },
  { key: "SessionStatus", value: "inactive", description: "Session has been terminated or expired" },

  { key: "ConversationMemberRole", value: "member", description: "Standard member of the conversation" },
  { key: "ConversationMemberRole", value: "admin", description: "Admin of the conversation with special privileges" },
  { key: "ConversationMemberRole", value: "owner", description: "Owner of the conversation with full control" },
];
