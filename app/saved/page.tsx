"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ArrowUpRight,
  Bookmark,
  CalendarDays,
  Flame,
  Heart,
  MapPin,
  Music4,
  Trash2,
} from "lucide-react";

import BottomNav from "../components/bottom-nav";
import { noxenEvents } from "../data/events";

const STORAGE_KEY = "noxen-saved-events";

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadSavedEvents();
  }, []);

  function loadSavedEvents() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const stored = raw ? JSON.parse(raw) : [];

      if (!Array.isArray(stored)) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify([])
        );

        setSavedIds([]);
        setReady(true);
        return;
      }

      const ids = stored
        .map((item: any) => {
          if (typeof item === "number") {
            return item;
          }

          return item?.id;
        })
        .filter(
          (id: any): id is number =>
            typeof id === "number"
        );

      const uniqueIds = [...new Set(ids)];

      const validEvents = noxenEvents.filter((event) =>
        uniqueIds.includes(event.id)
      );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(validEvents)
      );

      setSavedIds(
        validEvents.map((event) => event.id)
      );
    } catch (error) {
      console.error(
        "Gespeicherte Events konnten nicht geladen werden:",
        error
      );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([])
      );

      setSavedIds([]);
    } finally {
      setReady(true);
    }
  }

  function removeEvent(id: number) {
    try {
      const updatedIds = savedIds.filter(
        (savedId) => savedId !== id
      );

      const updatedEvents = noxenEvents.filter(
        (event) => updatedIds.includes(event.id)
      );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedEvents)
      );

      setSavedIds(updatedIds);
    } catch (error) {
      console.error(
        "Event konnte nicht entfernt werden:",
        error
      );
    }
  }

  function clearAll() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([])
      );

      setSavedIds([]);
    } catch (error) {
      console.error(
        "Favoriten konnten nicht gelöscht werden:",
        error
      );
    }
  }

  const savedEvents = noxenEvents.filter((event) =>
    savedIds.includes(event.id)
  );

  if (!ready) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
        <Background />

        <div className="relative z-10 flex flex-col items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-white/10 border-t-pink-400" />

          <p className="mt-4 text-[12px] font-bold text-white/35">
            Favoriten werden geladen...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black pb-36 text-white">
      <Background />

      <div
        className="relative z-10 mx-auto w-full max-w-3xl px-5"
        style={{
          paddingTop:
            "max(24px, calc(env(safe-area-inset-top) + 12px))",
        }}
      >
        {/* HEADER */}
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-300">
              NIGHTLIST
            </p>

            <h1 className="mt-2 text-[34px] font-black leading-none tracking-[-0.055em]">
              Gespeichert.
            </h1>

            <p className="mt-3 text-[12px] text-white/35">
              Deine Favoriten für die nächste Nacht.
            </p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-pink-400/15 bg-pink-500/10 text-pink-300">
            <Bookmark className="h-5 w-5" />
          </div>
        </header>

        {/* FAVORITES STATUS */}
        <div className="mt-6 flex items-center justify-between rounded-[22px] border border-white/[0.08] bg-white/[0.035] px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500/10 text-pink-300">
              <Heart
                className="h-4 w-4"
                fill="currentColor"
              />
            </div>

            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/25">
                Favoriten
              </p>

              <p className="mt-0.5 text-[13px] font-black">
                {savedEvents.length}{" "}
                {savedEvents.length === 1
                  ? "Event"
                  : "Events"}
              </p>
            </div>
          </div>

          {savedEvents.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[10px] font-black text-red-300/70 transition active:scale-95"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Alle löschen
            </button>
          )}
        </div>

        {/* EMPTY STATE */}
        {savedEvents.length === 0 ? (
          <div className="mt-4 flex min-h-[390px] flex-col items-center justify-center rounded-[30px] border border-white/[0.08] bg-white/[0.025] px-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-3xl" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-[26px] border border-purple-400/15 bg-purple-500/10 text-purple-300">
                <Bookmark className="h-8 w-8" />
              </div>
            </div>

            <p className="mt-6 text-[9px] font-black uppercase tracking-[0.25em] text-purple-300">
              DEINE NIGHTLIST
            </p>

            <h2 className="mt-3 text-[27px] font-black tracking-[-0.045em]">
              Noch nichts gespeichert.
            </h2>

            <p className="mt-3 max-w-[290px] text-[12px] leading-6 text-white/35">
              Swipe durch die Events und speichere die
              Nächte, die du nicht verpassen willst.
            </p>

            <Link
              href="/swipe"
              className="mt-6 flex h-14 w-full max-w-[290px] items-center justify-between rounded-[18px] bg-white px-5 text-[13px] font-black text-black transition active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                <Flame className="h-4 w-4" />
                Events entdecken
              </span>

              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          /* SAVED EVENTS */
          <div className="mt-4 space-y-3">
            {savedEvents.map((event) => (
              <article
                key={event.id}
                className="relative overflow-hidden rounded-[27px] border border-white/[0.08] bg-white/[0.03]"
              >
                {/* EVENT VISUAL */}
                <div className="relative h-[155px] overflow-hidden bg-gradient-to-br from-pink-600 via-purple-600 to-blue-700">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/70" />

                  <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10 blur-[60px]" />

                  <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-pink-400/20 blur-[60px]" />

                  {/* TOP TAGS */}
                  <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                    <div className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[9px] font-black text-white/70 backdrop-blur-xl">
                      {event.genre}
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full border border-orange-300/15 bg-black/30 px-3 py-2 text-[9px] font-black text-orange-200 backdrop-blur-xl">
                      <Flame className="h-3 w-3" />
                      {event.heatScore}%
                    </div>
                  </div>

                  {/* TITLE */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1.5">
                      <Heart
                        className="h-3 w-3 text-pink-300"
                        fill="currentColor"
                      />

                      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-pink-200/70">
                        Saved Night
                      </p>
                    </div>

                    <h2 className="mt-1.5 truncate text-[25px] font-black tracking-[-0.04em]">
                      {event.title}
                    </h2>
                  </div>
                </div>

                {/* EVENT DETAILS */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-[16px] font-black">
                        {event.club}
                      </h3>

                      <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-white/35">
                        <CalendarDays className="h-3 w-3" />

                        <span>
                          {event.date} · {event.startTime} Uhr
                        </span>
                      </div>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pink-400/15 bg-pink-500/10 text-pink-300">
                      <Heart
                        className="h-3.5 w-3.5"
                        fill="currentColor"
                      />
                    </div>
                  </div>

                  {/* META */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-2 text-[9px] font-bold text-white/40">
                      <MapPin className="h-3 w-3 text-purple-300" />
                      {event.city}
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-2 text-[9px] font-bold text-white/40">
                      <Music4 className="h-3 w-3 text-pink-300" />
                      {event.genre}
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-4 grid grid-cols-[1fr_auto] gap-2.5">
                    <Link
                      href={`/event?event=${event.id}`}
                      className="flex h-12 items-center justify-between rounded-[16px] bg-white px-4 text-[12px] font-black text-black transition active:scale-[0.98]"
                    >
                      <span>Event öffnen</span>

                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        removeEvent(event.id)
                      }
                      aria-label={`${event.title} entfernen`}
                      className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-red-400/15 bg-red-500/[0.08] text-red-300 transition active:scale-95"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}

function Background() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 bg-black" />

      <div className="pointer-events-none fixed left-[-150px] top-[-170px] h-[350px] w-[350px] rounded-full bg-pink-600/12 blur-[150px]" />

      <div className="pointer-events-none fixed right-[-170px] top-[35%] h-[330px] w-[330px] rounded-full bg-purple-600/10 blur-[150px]" />

      <div className="pointer-events-none fixed bottom-[-180px] left-[10%] h-[350px] w-[350px] rounded-full bg-blue-600/[0.07] blur-[160px]" />
    </>
  );
}