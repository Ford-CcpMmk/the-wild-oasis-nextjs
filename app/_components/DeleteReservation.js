"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservation } from "../_lib/actions";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId }) {
  // In this case, we cannot use the useFormStatus hook, because this component is not inside a form. So we need to use a different approach. We can use the useTransition hook from React to create a transition that will show a loading state while the action is being executed. useTransition allows us to mark a state update as so-called transition. And when a state update is marked as a transition by using the useTransition hook, that state update will happen without blocking the UI.  So, which means that the UI will stay responsive during a re-render, and we also get an indication that a state transition is happening.
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?")) {
      // Mark this state update as a transition
      startTransition(() => deleteReservation(bookingId));
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
