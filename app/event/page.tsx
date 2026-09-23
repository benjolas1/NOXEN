import { Suspense } from "react";
import EventClient from "./event-client";

export default function EventPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-purple-400" />
        </main>
      }
    >
      <EventClient />
    </Suspense>
  );
}