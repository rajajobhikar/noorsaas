import { BookingEvent } from "@/types/Bot";

export function BookingAnalytics({ bookings }: { bookings: BookingEvent[] }) {
  const total = bookings.length;
  const last = bookings[bookings.length - 1];

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Booking Analytics</h2>
      <p className="text-sm text-gray-700">Total Bookings: {total}</p>
      {last && (
        <p className="text-sm text-gray-700">
          Last booked by <span className="font-medium">{last.userId}</span> at{" "}
          {new Date(last.timestamp).toLocaleString()}
        </p>
      )}
    </div>
  );
}
