export type Dispute = {
  id: string;
  userId: string;
  type: 'MATCH' | 'MONEY' | 'ABUSE';
  description: string;
  status: 'OPEN' | 'RESOLVED';
  resolution?: string;
};

export const disputes: Dispute[] = [];