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
  id: string;
  key: K;
  value: AllowedValues[K][number];
  description: string;
};

// All possible static values, respecting the key-value structure
export const allStaticsValues: StaticValue<keyof AllowedValues>[] = [
  {
    key: "FriendRequestStatus",
    value: "pending",
    description: "Request is pending",
    id: "677e5e474641c0b31f93db2e",
  },
  {
    key: "FriendRequestStatus",
    value: "accepted",
    description: "Request has been accepted",
    id: "677e5e474641c0b31f93db2f",
  },
  {
    key: "FriendRequestStatus",
    value: "rejected",
    description: "Request has been rejected",
    id: "677e5e474641c0b31f93db30",
  },
  {
    key: "MessageReadStatus",
    value: "unread",
    description: "Message is unread",
    id: "677e5e474641c0b31f93db31",
  },
  {
    key: "MessageReadStatus",
    value: "read",
    description: "Message has been read",
    id: "677e5e474641c0b31f93db32",
  },
  {
    key: "ConversationType",
    value: "private",
    description: "Private conversation between two users",
    id: "677e5e474641c0b31f93db33",
  },
  {
    key: "ConversationType",
    value: "group",
    description: "Group conversation with multiple members",
    id: "677e5e474641c0b31f93db34",
  },
  {
    key: "NotificationType",
    value: "friend_request",
    description: "Notification for a friend request",
    id: "677e5e474641c0b31f93db35",
  },
  {
    key: "NotificationType",
    value: "message",
    description: "Notification for a new message",
    id: "677e5e474641c0b31f93db36",
  },
  {
    key: "NotificationType",
    value: "mention",
    description: "Notification for a mention",
    id: "677e5e474641c0b31f93db37",
  },
  {
    key: "NotificationType",
    value: "system",
    description: "System-related notification",
    id: "677e5e474641c0b31f93db38",
  },
  {
    key: "SessionStatus",
    value: "active",
    description: "Session is currently active",
    id: "677e5e474641c0b31f93db39",
  },
  {
    key: "SessionStatus",
    value: "inactive",
    description: "Session has been terminated or expired",
    id: "677e5e474641c0b31f93db3a",
  },
  {
    key: "ConversationMemberRole",
    value: "member",
    description: "Standard member of the conversation",
    id: "677e5e474641c0b31f93db3b",
  },
  {
    key: "ConversationMemberRole",
    value: "admin",
    description: "Admin of the conversation with special privileges",
    id: "677e5e474641c0b31f93db3c",
  },
  {
    key: "ConversationMemberRole",
    value: "owner",
    description: "Owner of the conversation with full control",
    id: "677e5e474641c0b31f93db3d",
  },
];
