export type Player = {
  id: string;
  name: string;
  email: string;
};

export type Group = {
  id: string;
  name: string;
  createdBy: string;
  players: Player[];
};