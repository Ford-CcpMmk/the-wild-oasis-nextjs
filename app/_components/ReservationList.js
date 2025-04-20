"use client";

import { useOptimistic } from "react";
import { deleteReservation } from "../_lib/actions";
import ReservationCard from "./ReservationCard";

export default function ReservationList({ bookings }) {
  // CAN READ OPTIMISTIC UI MORE IN KNOWLEDGE.TXT

  // useOptimistic hook takes 2 arguments:
  // 1. The current state, while will be the one that is usually rendered here.
  // 2. a state update function which will determine the next optimistic state. So this always takes in the current state (bookings) and then some new information (bookingId) that is necessary to compute that optimistic state. And usually that piece of information is exactly the same one that is necessary for the actual async operation.

  // The 2 outputs are basically the opmistic bookings, and the optismisticDelete which is similar to the dispatch function from useReducer. The dispatch function would be the one that triggers that state update function.
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  // And so down here, we then simply create a new function because that is what makes most sense in our example where we basically combine these two. So first the optimistic operation and then the actual operation.
  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
