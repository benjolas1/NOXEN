"use client";

import Link from "next/link";

import {
  Crown,
  Heart,
  Bookmark,
  Flame,
  MapPin,
  Settings,
  ChevronRight,
  BadgeCheck,
  Bell,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import BottomNav from "../components/bottom-nav";

export default function ProfilePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black pb-36 text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-140px] top-[-100px] h-[320px] w-[320px] rounded-full bg-pink-500/15 blur-[130px]" />

        <div className="absolute bottom-[-100px] right-[-140px] h-[360px] w-[360px] rounded-full bg-blue-500/15 blur-[140px]" />

        <div className="absolute left-1/2 top-[350px] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-purple-500/[0.08] blur-[140px]" />
      </div>

      {/* CONTENT */}
      <div
        className="relative z-10 mx-auto w-full max-w-md px-5"
        style={{
          paddingTop: "max(56px, calc(env(safe-area-inset-top) + 28px))",
        }}
      >
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div className="min-w-0">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.32em] text-purple-300">
              NOXEN PROFILE
            </p>

            <h1 className="text-[38px] font-black leading-none tracking-[-0.04em]">
              Ben Jolas
            </h1>
          </div>

          <Link
            href="/settings"
            aria-label="Einstellungen"
            className="ml-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] transition active:scale-95"
          >
            <Settings className="h-5 w-5 text-white/70" />
          </Link>
        </div>

        {/* PROFILE CARD */}
        <section className="relative mb-5 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl">
          <div className="pointer-events-none absolute -left-16 -top-16 h-36 w-36 rounded-full bg-pink-500/20 blur-[70px]" />

          <div className="pointer-events-none absolute -bottom-20 right-0 h-40 w-40 rounded-full bg-blue-500/15 blur-[80px]" />

          <div className="relative z-10 flex items-center gap-4">
            {/* AVATAR */}
            <div className="relative shrink-0">
              <div className="flex h-[82px] w-[82px] items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-[2px] shadow-[0_0_35px_rgba(168,85,247,0.25)]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-2xl font-black">
                  B
                </div>
              </div>

              <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-[#080808] bg-green-500">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
            </div>

            {/* USER INFO */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h2 className="truncate text-xl font-black tracking-tight">
                  @ben.jolas
                </h2>

                <BadgeCheck className="h-[18px] w-[18px] shrink-0 text-blue-400" />
              </div>

              <p className="mt-1 text-sm text-white/45">
                NOXEN Beta Tester
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <div className="rounded-full border border-pink-500/20 bg-pink-500/15 px-3 py-1.5 text-[11px] font-semibold text-pink-300">
                  Nightlife Lover
                </div>

                <div className="flex items-center gap-1 rounded-full border border-orange-500/20 bg-orange-500/15 px-3 py-1.5 text-[11px] font-bold text-orange-300">
                  <Crown className="h-3 w-3" />
                  VIP
                </div>
              </div>
            </div>
          </div>

          {/* BETA BADGE */}
          <div className="relative z-10 mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4">
            <Sparkles className="h-4 w-4 text-purple-300" />

            <p className="text-xs text-white/40">
              Du bist Teil der{" "}
              <span className="font-semibold text-white/70">
                NOXEN Beta
              </span>
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="mb-7 grid grid-cols-3 gap-2.5">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] px-3 py-4 text-center">
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10">
              <Flame className="h-4 w-4 text-orange-400" />
            </div>

            <p className="text-xl font-black">
              12
            </p>

            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/35">
              Nights
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] px-3 py-4 text-center">
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-pink-500/10">
              <Heart className="h-4 w-4 text-pink-400" />
            </div>

            <p className="text-xl font-black">
              8
            </p>

            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/35">
              Likes
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] px-3 py-4 text-center">
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-yellow-500/10">
              <Crown className="h-4 w-4 text-yellow-400" />
            </div>

            <p className="text-xl font-black">
              VIP
            </p>

            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/35">
              Status
            </p>
          </div>
        </section>

        {/* ACCOUNT */}
        <section>
          <div className="mb-3 px-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
              DEIN NOXEN
            </p>
          </div>

          <div className="space-y-3">
            {/* SAVED */}
            <Link
              href="/saved"
              className="group flex items-center justify-between rounded-[25px] border border-white/10 bg-white/[0.04] p-4 transition active:scale-[0.98] active:bg-white/[0.07]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-500/15">
                  <Bookmark className="h-5 w-5 text-pink-400" />
                </div>

                <div>
                  <p className="text-sm font-bold">
                    Gespeicherte Events
                  </p>

                  <p className="mt-0.5 text-xs text-white/35">
                    Deine Favoriten
                  </p>
                </div>
              </div>

              <ChevronRight className="h-5 w-5 text-white/20 transition group-hover:translate-x-0.5" />
            </Link>

            {/* REGION */}
            <Link
              href="/region"
              className="group flex items-center justify-between rounded-[25px] border border-white/10 bg-white/[0.04] p-4 transition active:scale-[0.98] active:bg-white/[0.07]"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15">
                  <MapPin className="h-5 w-5 text-blue-400" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-bold">
                    Deine Region
                  </p>

                  <p className="mt-0.5 truncate text-xs text-white/35">
                    Nordrhein-Westfalen
                  </p>
                </div>
              </div>

              <ChevronRight className="h-5 w-5 shrink-0 text-white/20" />
            </Link>

            {/* NOTIFICATIONS */}
            <Link
              href="/notifications"
              className="group flex items-center justify-between rounded-[25px] border border-white/10 bg-white/[0.04] p-4 transition active:scale-[0.98] active:bg-white/[0.07]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-500/15">
                  <Bell className="h-5 w-5 text-purple-300" />
                </div>

                <div>
                  <p className="text-sm font-bold">
                    Benachrichtigungen
                  </p>

                  <p className="mt-0.5 text-xs text-white/35">
                    Events & Live Alerts
                  </p>
                </div>
              </div>

              <ChevronRight className="h-5 w-5 text-white/20" />
            </Link>

            {/* SETTINGS */}
            <Link
              href="/settings"
              className="group flex items-center justify-between rounded-[25px] border border-white/10 bg-white/[0.04] p-4 transition active:scale-[0.98] active:bg-white/[0.07]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06]">
                  <Settings className="h-5 w-5 text-white/65" />
                </div>

                <div>
                  <p className="text-sm font-bold">
                    Einstellungen
                  </p>

                  <p className="mt-0.5 text-xs text-white/35">
                    Account & App
                  </p>
                </div>
              </div>

              <ChevronRight className="h-5 w-5 text-white/20" />
            </Link>
          </div>
        </section>

        {/* BETA FOOTER */}
        <div className="mt-7 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/20">
          <ShieldCheck className="h-3.5 w-3.5" />
          NOXEN BETA
        </div>
      </div>

      <BottomNav />
    </main>
  );
}