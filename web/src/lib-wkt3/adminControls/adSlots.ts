type AdSlot = { id: string; duration: number; booked: boolean };
export const adSlots: AdSlot[] = [
  { id: "slot-5s", duration: 5, booked: false },
  { id: "slot-10s", duration: 10, booked: false },
];

export function toggleAdSlot(slotId: string): void {
  const slot = adSlots.find((s) => s.id === slotId);
  if (slot) slot.booked = !slot.booked;
}
