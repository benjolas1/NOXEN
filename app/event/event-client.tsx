"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock,
  Flame,
  Heart,
  MapPin,
  Music,
  Navigation,
  Share2,
  Ticket,
  Users,
  Zap,
} from "lucide-react";

import { noxenEvents } from "../data/events";

const STORAGE_KEY = "noxen-saved-events";

export default function EventClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const eventId = Number(
    searchParams.get("event") || "1"
  );

  const event =
    noxenEvents.find(
      (item) => item.id === eventId
    ) ?? noxenEvents[0];

  const [isSaved, setIsSaved] =
    useState(false);

  const [shareSuccess, setShareSuccess] =
    useState(false);

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem(STORAGE_KEY);

      const stored = raw
        ? JSON.parse(raw)
        : [];

      if (!Array.isArray(stored)) {
        setIsSaved(false);
        return;
      }

      const saved = stored.some(
        (item: any) => {
          const id =
            typeof item === "number"
              ? item
              : item?.id;

          return id === event.id;
        }
      );

      setIsSaved(saved);
    } catch (error) {
      console.error(
        "Favoriten konnten nicht geladen werden:",
        error
      );

      setIsSaved(false);
    }
  }, [event.id]);

  function toggleSave() {
    try {
      const raw =
        localStorage.getItem(STORAGE_KEY);

      const stored = raw
        ? JSON.parse(raw)
        : [];

      const storedArray =
        Array.isArray(stored)
          ? stored
          : [];

      const savedIds = storedArray
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

      if (savedIds.includes(event.id)) {
        const updatedIds =
          savedIds.filter(
            (id) => id !== event.id
          );

        const updatedEvents =
          noxenEvents.filter((item) =>
            updatedIds.includes(item.id)
          );

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updatedEvents)
        );

        setIsSaved(false);
        return;
      }

      const updatedIds = [
        ...new Set([
          ...savedIds,
          event.id,
        ]),
      ];

      const updatedEvents =
        noxenEvents.filter((item) =>
          updatedIds.includes(item.id)
        );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedEvents)
      );

      setIsSaved(true);
    } catch (error) {
      console.error(
        "Event konnte nicht gespeichert werden:",
        error
      );
    }
  }

  async function shareEvent() {
    const shareData = {
      title: `${event.title} – ${event.club}`,
      text: `${event.title} im ${event.club} in ${event.city} 🔥`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(
          shareData
        );

        return;
      }

      await navigator.clipboard.writeText(
        window.location.href
      );

      setShareSuccess(true);

      window.setTimeout(() => {
        setShareSuccess(false);
      }, 2000);
    } catch (error: any) {
      if (
        error?.name !== "AbortError"
      ) {
        console.error(
          "Event konnte nicht geteilt werden:",
          error
        );
      }
    }
  }

  function openNavigation() {
    const destination = [
      event.club,
      event.location,
      event.city,
    ]
      .filter(Boolean)
      .join(", ");

    const encodedDestination =
      encodeURIComponent(destination);

    const isAppleDevice =
      /iPad|iPhone|iPod|Macintosh/i.test(
        navigator.userAgent
      );

    const url = isAppleDevice
      ? `https://maps.apple.com/?daddr=${encodedDestination}`
      : `https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black pb-10 text-white">
      <Background />

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-md">
        {/* HERO */}
        <section className="relative h-[370px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-700" />

          <div className="absolute -right-20 top-10 h-60 w-60 rounded-full bg-white/10 blur-[90px]" />

          <div className="absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-pink-400/20 blur-[90px]" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black" />

          {/* NAVIGATION */}
          <div
            className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-5"
            style={{
              paddingTop:
                "max(24px, calc(env(safe-area-inset-top) + 12px))",
            }}
          >
            <button
              type="button"
              onClick={() =>
                router.back()
              }
              aria-label="Zurück"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-white backdrop-blur-xl transition active:scale-95"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={toggleSave}
                aria-label={
                  isSaved
                    ? "Event aus Favoriten entfernen"
                    : "Event speichern"
                }
                className={`flex h-11 w-11 items-center justify-center rounded-2xl border backdrop-blur-xl transition active:scale-95 ${
                  isSaved
                    ? "border-pink-400/25 bg-pink-500/20 text-pink-200"
                    : "border-white/10 bg-black/25 text-white"
                }`}
              >
                <Heart
                  className="h-4.5 w-4.5"
                  fill={
                    isSaved
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

              <button
                type="button"
                onClick={shareEvent}
                aria-label="Event teilen"
                className={`flex h-11 w-11 items-center justify-center rounded-2xl border backdrop-blur-xl transition active:scale-95 ${
                  shareSuccess
                    ? "border-green-400/25 bg-green-500/20 text-green-300"
                    : "border-white/10 bg-black/25 text-white"
                }`}
              >
                {shareSuccess ? (
                  <Check className="h-4.5 w-4.5" />
                ) : (
                  <Share2 className="h-4.5 w-4.5" />
                )}
              </button>
            </div>
          </div>

          {/* TAGS */}
          <div className="absolute left-5 right-5 top-[105px] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-2 text-[9px] font-black uppercase tracking-[0.1em] backdrop-blur-xl">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-40" />

                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                </span>

                Live Now
              </div>

              <div className="rounded-full border border-white/10 bg-black/25 px-3 py-2 text-[9px] font-bold text-white/70 backdrop-blur-xl">
                {event.genre}
              </div>
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-orange-300/15 bg-black/25 px-3 py-2 text-[9px] font-black text-orange-200 backdrop-blur-xl">
              <Flame className="h-3.5 w-3.5" />
              {event.heatScore}%
            </div>
          </div>

          {/* HERO CONTENT */}
          <div className="absolute bottom-7 left-5 right-5">
            <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-white/45">
              <Zap className="h-3 w-3 text-pink-300" />
              Tonight&apos;s vibe
            </div>

            <h1 className="mt-2 text-[42px] font-black leading-[0.92] tracking-[-0.06em]">
              {event.title}
            </h1>

            <p className="mt-3 text-[14px] font-bold text-white/50">
              {event.club}
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="relative -mt-1 px-5">
          {/* LIVE ENERGY */}
          <div className="rounded-[27px] border border-white/[0.08] bg-[#0a0a0a]/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30">
                  Live Energy
                </p>

                <div className="mt-1.5 flex items-center gap-2">
                  <Flame className="h-4 w-4 text-pink-400" />

                  <span className="text-[25px] font-black leading-none">
                    {event.heatScore}%
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/30">
                  Live Crowd
                </p>

                <div className="mt-1.5 flex items-center justify-end gap-2">
                  <Users className="h-4 w-4 text-purple-300" />

                  <span className="text-[18px] font-black leading-none">
                    {event.crowd}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                style={{
                  width: `${event.heatScore}%`,
                }}
              />
            </div>
          </div>

          {/* INFO GRID */}
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <InfoCard
              icon={
                <CalendarDays className="h-4 w-4" />
              }
              title="Datum"
              value={formatDate(
                event.date
              )}
            />

            <InfoCard
              icon={
                <Clock className="h-4 w-4" />
              }
              title="Start"
              value={`${event.startTime} Uhr`}
            />

            <InfoCard
              icon={
                <Users className="h-4 w-4" />
              }
              title="Crowd"
              value={event.crowd}
            />

            <InfoCard
              icon={
                <Ticket className="h-4 w-4" />
              }
              title="Eintritt"
              value={`${event.price} €`}
            />
          </div>

          {/* LOCATION */}
          <div className="mt-3 rounded-[25px] border border-white/[0.08] bg-white/[0.03] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-300">
                <MapPin className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/25">
                  Location
                </p>

                <h3 className="mt-1.5 truncate text-[15px] font-black">
                  {event.club}
                </h3>

                <p className="mt-1 text-[11px] leading-5 text-white/35">
                  {event.location}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openNavigation}
              className="mt-4 flex h-11 w-full items-center justify-between rounded-[15px] border border-white/[0.08] bg-white/[0.04] px-4 text-[11px] font-black text-white/65 transition active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                <Navigation className="h-3.5 w-3.5 text-purple-300" />
                Route öffnen
              </span>

              <span className="text-white/25">
                →
              </span>
            </button>
          </div>

          {/* LINEUP */}
          <div className="mt-3 rounded-[25px] border border-white/[0.08] bg-white/[0.03] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-300">
                <Music className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/25">
                  DJ Lineup
                </p>

                <h3 className="mt-1.5 text-[14px] font-black leading-6 text-white/80">
                  {event.lineup.join(
                    " · "
                  )}
                </h3>
              </div>
            </div>
          </div>

          {/* ABOUT */}
          <div className="mt-3 rounded-[25px] border border-white/[0.08] bg-white/[0.03] p-4">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/25">
              About tonight
            </p>

            <p className="mt-3 text-[12px] leading-[1.7] text-white/45">
              {event.description}
            </p>
          </div>

          {/* SAVE CTA */}
          <button
            type="button"
            onClick={toggleSave}
            className={`mt-3 flex h-14 w-full items-center justify-between rounded-[18px] px-5 text-[13px] font-black transition active:scale-[0.98] ${
              isSaved
                ? "border border-pink-400/20 bg-pink-500/15 text-pink-300"
                : "bg-white text-black"
            }`}
          >
            <span className="flex items-center gap-2">
              <Heart
                className="h-4 w-4"
                fill={
                  isSaved
                    ? "currentColor"
                    : "none"
                }
              />

              {isSaved
                ? "Event gespeichert"
                : "Event speichern"}
            </span>

            {isSaved ? (
              <Check className="h-4 w-4" />
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                +
              </span>
            )}
          </button>
        </section>
      </div>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[21px] border border-white/[0.08] bg-white/[0.03] p-3.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300">
        {icon}
      </div>

      <p className="mt-3 text-[8px] font-black uppercase tracking-[0.16em] text-white/25">
        {title}
      </p>

      <p className="mt-1 text-[12px] font-black text-white/75">
        {value}
      </p>
    </div>
  );
}

function Background() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 bg-black" />

      <div className="pointer-events-none fixed left-[-150px] top-[-170px] h-[350px] w-[350px] rounded-full bg-pink-600/10 blur-[150px]" />

      <div className="pointer-events-none fixed right-[-170px] top-[35%] h-[330px] w-[330px] rounded-full bg-purple-600/10 blur-[150px]" />

      <div className="pointer-events-none fixed bottom-[-180px] left-[10%] h-[350px] w-[350px] rounded-full bg-blue-600/[0.07] blur-[160px]" />
    </>
  );
}

function formatDate(date: string) {
  const value = new Date(
    `${date}T12:00:00`
  );

  return value.toLocaleDateString(
    "de-DE",
    {
      day: "2-digit",
      month: "2-digit",
    }
  );
}