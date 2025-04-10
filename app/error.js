// The error boundary actually needs to always be a client component.
"use client";

// This component will get the error object itself, plus a function that we can call to reset the error boundary. And so that clicking, so that action basically interactive, which can only happen in a client component.

// Please note: Error boundary works for all errors and exceptions that happen anywhere in the app, but only in rendering. So any errors that will happen in callback functions will actually not be caught by a React error boundary. And not catch error that might happen in the root layout.

// If we still wanted to catch any errors, even if they are in the root layout, then we would need to create a file called global-error.js. And so that will then actually replace the entire layout. So even the root layout will then be gone. So the idea behind that is pretty similar, but the global error also needs to define its own <html> and <body> tag, just like the root layout, because again, these will then be gone, and so therefore then we need to place them in that global-error.js.

export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
