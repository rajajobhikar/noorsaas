import { logAction } from "@/lib-wkt3/auditTrail/logAction";

type WithdrawRequest = {
  id: string;
  userId: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  timestamp: number;
};

const requests: WithdrawRequest[] = [];

export function submitWithdraw(
  userId: string,
  amount: number
): WithdrawRequest {
  const req: WithdrawRequest = {
    id: `wr-${Date.now()}`,
    userId,
    amount,
    status: "PENDING",
    timestamp: Date.now(),
  };
  requests.push(req);
  return req;
}

export function getPendingWithdraws(): WithdrawRequest[] {
  return requests.filter((r) => r.status === "PENDING");
}

export function getApprovedWithdraws(): WithdrawRequest[] {
  return requests.filter((r) => r.status === "APPROVED");
}

export function getRejectedWithdraws(): WithdrawRequest[] {
  return requests.filter((r) => r.status === "REJECTED");
}


export function getAllWithdrawRequests(): WithdrawRequest[] {
  return requests;
}

export function rejectWithdraw(id: string): boolean {
  const req = requests.find((r) => r.id === id);
  if (!req) return false;
  req.status = "REJECTED";
  logAction(req.userId, `Withdraw rejected: ₹${req.amount}`);
  return true;
}

export function approveWithdraw(id: string): boolean {
  const req = requests.find((r) => r.id === id);
  if (!req) return false;
  req.status = "APPROVED";
  logAction(req.userId, `Withdraw approved: ₹${req.amount}`);
  return true;
}
