"use client";

import Link from "next/link";
import {
  Flame,
  MapPin,
  CalendarDays,
  ChevronRight,
  Music4,
  Users,
} from "lucide-react";

import BottomNav from "../components/bottom-nav";
import { noxenEvents } from "../data/events";

export default function EventsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black pb-36 text-white">
      <div className="pointer-events-none fixed left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-pink-500/15 blur-[140px]" />

      <div className="pointer-events-none fixed bottom-[-140px] right-[-120px] h-[320px] w-[320px] rounded-full bg-purple-500/15 blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 pt-14">
        <header className="mb-10">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-pink-300">
            NOXEN
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-[-0.05em]">
            Live Events
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/45">
            Entdecke, wo heute Nacht wirklich etwas geht.
          </p>
        </header>

        <section className="space-y-5">
          {noxenEvents.map((event) => (
            <Link
              key={event.id}
              href={`/event?event=${event.id}`}
              className="block overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600">
                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/20 blur-[80px]" />

                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-black backdrop-blur-xl">
                    <Flame className="h-4 w-4 text-orange-300" />
                    HOT NIGHT
                  </div>

                  <div className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-black backdrop-blur-xl">
                    {event.genre}
                  </div>
                </div>

                <div className="absolute right-5 top-5 rounded-full border border-orange-500/20 bg-black/40 px-4 py-2 text-xs font-black text-orange-300 backdrop-blur-xl">
                  🔥 {event.heatScore}%
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">
                    Tonight
                  </p>

                  <h2 className="mt-2 text-4xl font-black tracking-[-0.05em]">
                    {event.title}
                  </h2>

                  <p className="mt-2 text-lg font-bold text-white/65">
                    {event.club}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-5 text-sm text-white/50">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {event.city}
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {formatDate(event.date)} · {event.startTime}
                  </div>

                  <div className="flex items-center gap-2">
                    <Music4 className="h-4 w-4" />
                    {event.genre}
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {event.crowd}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-black">
                      {event.price === 0
                        ? "Kostenlos"
                        : `ab ${event.price} €`}
                    </p>

                    <p className="mt-1 text-xs text-white/35">
                      Eventdetails ansehen
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>

      <BottomNav />
    </main>
  );
}

function formatDate(date: string) {
  const value = new Date(`${date}T12:00:00`);

  return value.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
  });
}