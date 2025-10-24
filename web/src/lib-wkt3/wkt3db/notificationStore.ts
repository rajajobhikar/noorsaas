export type Notification = {
  id: string;
  type: "signup" | "dispute" | "game" | "admin";
  message: string;
  timestamp: number;
};

export const notifications: Notification[] = [];

export function pushNotification(n: Notification) {
  notifications.unshift(n); // newest first
}
