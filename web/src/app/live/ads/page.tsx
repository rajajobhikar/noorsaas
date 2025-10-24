'use client';
import { adPlans } from './plans';

export default function AdBookingPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Advertise with Us</h1>
      <p className="mt-2">Choose a reel plan and pay 100% advance to book your slot.</p>
      <ul className="mt-4 space-y-4">
        {adPlans.map(plan => (
          <li key={plan.duration} className="border p-4 rounded">
            <h2 className="font-semibold">{plan.duration}s Reel</h2>
            <p>{plan.label}</p>
            <p>Price: ₹{plan.price}</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Book Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
}