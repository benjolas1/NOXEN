"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ArrowUpRight,
  Check,
  Flame,
  Heart,
  MapPin,
  Music4,
  RotateCcw,
  Users,
  X,
  Zap,
} from "lucide-react";

import BottomNav from "../components/bottom-nav";
import { noxenEvents } from "../data/events";

const STORAGE_KEY = "noxen-saved-events";

export default function SwipeClient() {
  const [index, setIndex] = useState(0);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [storageReady, setStorageReady] = useState(false);

  const current = noxenEvents[index];

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const stored = raw ? JSON.parse(raw) : [];

      if (!Array.isArray(stored)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        setSavedIds([]);
        return;
      }

      const ids = stored
        .map((item: any) => {
          if (typeof item === "number") {
            return item;
          }

          return item?.id;
        })
        .filter((id: any): id is number => typeof id === "number");

      setSavedIds([...new Set(ids)]);
    } catch {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      setSavedIds([]);
    } finally {
      setStorageReady(true);
    }
  }, []);

  const nextCard = () => {
    setIndex((currentIndex) => currentIndex + 1);
  };

  const restart = () => {
    setIndex(0);
  };

  const saveCurrentEvent = () => {
    if (!current) return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const stored = raw ? JSON.parse(raw) : [];

      const storedArray = Array.isArray(stored) ? stored : [];

      const savedEvents = storedArray
        .map((item: any) => {
          if (typeof item === "number") {
            return noxenEvents.find((event) => event.id === item);
          }

          return item;
        })
        .filter(Boolean);

      const alreadySaved = savedEvents.some(
        (item: any) => item.id === current.id
      );

      if (!alreadySaved) {
        const updated = [...savedEvents, current];

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updated)
        );

        setSavedIds((previous) => [
          ...new Set([...previous, current.id]),
        ]);
      }

      nextCard();
    } catch (error) {
      console.error(
        "Event konnte nicht gespeichert werden:",
        error
      );
    }
  };

  const removeCurrentEvent = () => {
    if (!current) return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const stored = raw ? JSON.parse(raw) : [];

      const storedArray = Array.isArray(stored) ? stored : [];

      const updated = storedArray.filter((item: any) => {
        const id =
          typeof item === "number"
            ? item
            : item?.id;

        return id !== current.id;
      });

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );

      setSavedIds((previous) =>
        previous.filter((id) => id !== current.id)
      );
    } catch (error) {
      console.error(
        "Event konnte nicht entfernt werden:",
        error
      );
    }
  };

  const handleSaveButton = () => {
    if (!current) return;

    const alreadySaved = savedIds.includes(current.id);

    if (alreadySaved) {
      removeCurrentEvent();
      return;
    }

    saveCurrentEvent();
  };

  const isSaved = current
    ? savedIds.includes(current.id)
    : false;

  if (!storageReady) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
        <Background />

        <div className="relative z-10 flex flex-col items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-white/10 border-t-purple-400" />

          <p className="mt-4 text-[12px] font-bold text-white/35">
            NOXEN lädt deine Nacht...
          </p>
        </div>
      </main>
    );
  }

  if (!current) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-black pb-32 text-white">
        <Background />

        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-md items-center justify-center px-5">
          <div className="w-full text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] border border-purple-400/15 bg-purple-500/10 text-purple-300">
              <Flame className="h-8 w-8" />
            </div>

            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-purple-300">
              DISCOVERY COMPLETE
            </p>

            <h1 className="mt-3 text-[36px] font-black leading-[0.95] tracking-[-0.055em]">
              Alles gesehen.
            </h1>

            <p className="mx-auto mt-4 max-w-[310px] text-[13px] leading-6 text-white/40">
              Du hast alle Events entdeckt. Deine Favoriten
              warten unter Gespeichert auf dich.
            </p>

            <div className="mt-7 space-y-3">
              <Link
                href="/saved"
                className="flex h-14 w-full items-center justify-between rounded-[18px] bg-white px-5 font-black text-black transition active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Gespeicherte Events
                </span>

                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={restart}
                className="flex h-13 w-full items-center justify-center gap-2 rounded-[18px] border border-white/10 bg-white/[0.04] px-5 py-4 text-[13px] font-black text-white/70 transition active:scale-[0.98]"
              >
                <RotateCcw className="h-4 w-4" />
                Neu starten
              </button>
            </div>
          </div>
        </div>

        <BottomNav />
      </main>
    );
  }

  const progress =
    ((index + 1) / noxenEvents.length) * 100;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black pb-32 text-white">
      <Background />

      <div
        className="relative z-10 mx-auto w-full max-w-xl px-5"
        style={{
          paddingTop:
            "max(24px, calc(env(safe-area-inset-top) + 12px))",
        }}
      >
        {/* HEADER */}
        <header className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-300">
              SWIPE EVENTS
            </p>

            <h1 className="mt-1 text-[30px] font-black tracking-[-0.05em]">
              Discover
            </h1>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-green-400/15 bg-green-400/[0.08] px-3 py-2 text-[9px] font-black uppercase tracking-[0.12em] text-green-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Live
          </div>
        </header>

        {/* PROGRESS */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-bold text-white/30">
              Deine Auswahl
            </p>

            <p className="text-[10px] font-black text-white/45">
              {index + 1}
              <span className="text-white/20">
                {" "}
                / {noxenEvents.length}
              </span>
            </p>
          </div>

          <div className="h-1 overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* EVENT CARD */}
        <section className="relative mt-4">
          <div className="absolute inset-x-3 bottom-[-9px] top-4 rounded-[30px] border border-white/[0.06] bg-white/[0.025]" />

          <article className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#080808] shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
            {/* VISUAL */}
            <div className="relative h-[205px] overflow-hidden bg-gradient-to-br from-pink-600 via-purple-600 to-blue-700">
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/5 to-black/60" />

              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-[60px]" />

              <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-pink-400/20 blur-[70px]" />

              {/* TOP TAGS */}
              <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[9px] font-black uppercase tracking-[0.1em] backdrop-blur-xl">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    Live Now
                  </div>

                  <div className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[9px] font-bold text-white/70 backdrop-blur-xl">
                    {current.genre}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-orange-300/15 bg-black/30 px-3 py-2 text-[10px] font-black text-orange-200 backdrop-blur-xl">
                  <Flame className="h-3.5 w-3.5" />
                  {current.energy}
                </div>
              </div>

              {/* VISUAL TEXT */}
              <div className="absolute bottom-5 left-5">
                <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-white/50">
                  <Zap className="h-3 w-3 text-pink-300" />
                  Tonight&apos;s vibe
                </div>

                <p className="mt-1 text-[28px] font-black tracking-[-0.045em]">
                  Peak Energy
                </p>
              </div>
            </div>

            {/* EVENT INFORMATION */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-[28px] font-black leading-none tracking-[-0.045em]">
                    {current.title}
                  </h2>

                  <p className="mt-2 truncate text-[13px] font-semibold text-white/40">
                    {current.club}
                  </p>
                </div>

                {isSaved && (
                  <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-pink-400/15 bg-pink-500/10 px-2.5 py-2 text-[9px] font-black text-pink-300">
                    <Check className="h-3 w-3" />
                    SAVED
                  </div>
                )}
              </div>

              {/* META */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.035] px-3 py-2 text-[10px] font-bold text-white/45">
                  <MapPin className="h-3.5 w-3.5 text-purple-300" />
                  {current.city}
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.035] px-3 py-2 text-[10px] font-bold text-white/45">
                  <Music4 className="h-3.5 w-3.5 text-pink-300" />
                  {current.genre}
                </div>
              </div>

              {/* CROWD */}
              <div className="mt-4 flex items-center justify-between rounded-[20px] border border-white/[0.07] bg-white/[0.035] px-4 py-3.5">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/30">
                    Live Crowd
                  </p>

                  <div className="mt-1 flex items-baseline gap-2">
                    <p className="text-[23px] font-black leading-none">
                      {current.crowd}
                    </p>

                    <p className="text-[9px] text-white/30">
                      gerade dabei
                    </p>
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/25 to-purple-500/25 text-pink-200">
                  <Users className="h-4.5 w-4.5" />
                </div>
              </div>

              {/* OPEN EVENT */}
              <Link
                href={`/event?event=${current.id}`}
                className="mt-4 flex h-13 w-full items-center justify-between rounded-[18px] bg-white px-5 py-4 text-[13px] font-black text-black transition active:scale-[0.98]"
              >
                <span>Event öffnen</span>

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>

              {/* ACTIONS */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={nextCard}
                  className="flex h-12 items-center justify-center gap-2 rounded-[17px] border border-white/[0.08] bg-white/[0.035] text-[12px] font-black text-white/50 transition active:scale-[0.97]"
                >
                  <X className="h-4 w-4" />
                  Skip
                </button>

                <button
                  type="button"
                  onClick={handleSaveButton}
                  className={`flex h-12 items-center justify-center gap-2 rounded-[17px] border text-[12px] font-black transition active:scale-[0.97] ${
                    isSaved
                      ? "border-pink-400/20 bg-pink-500/15 text-pink-300"
                      : "border-purple-400/15 bg-purple-500/10 text-purple-200"
                  }`}
                >
                  <Heart
                    className="h-4 w-4"
                    fill={isSaved ? "currentColor" : "none"}
                  />

                  {isSaved ? "Gespeichert" : "Speichern"}
                </button>
              </div>
            </div>
          </article>
        </section>

        <p className="mt-5 text-center text-[9px] font-bold uppercase tracking-[0.12em] text-white/20">
          Skip zum Überspringen · Speichern für später
        </p>
      </div>

      <BottomNav />
    </main>
  );
}

function Background() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 bg-black" />

      <div className="pointer-events-none fixed left-[-140px] top-[-170px] h-[340px] w-[340px] rounded-full bg-purple-600/15 blur-[150px]" />

      <div className="pointer-events-none fixed right-[-170px] top-[35%] h-[320px] w-[320px] rounded-full bg-pink-600/10 blur-[150px]" />

      <div className="pointer-events-none fixed bottom-[-180px] left-[10%] h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[160px]" />
    </>
  );
}