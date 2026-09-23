import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  Flame,
  MapPin,
  UserRound,
} from "lucide-react";

export default function Hero() {
  return (
    <>
      {/* HEADER */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-[54px] w-[54px] shrink-0 items-center justify-center">
            <div className="absolute inset-1 rounded-full bg-purple-500/20 blur-xl" />

            <Image
              src="/noxen-logo.png"
              alt="NOXEN"
              width={54}
              height={54}
              priority
              unoptimized
              className="relative h-[54px] w-[54px] object-contain drop-shadow-[0_0_14px_rgba(168,85,247,0.55)]"
            />
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.32em] text-purple-300">
              NOXEN
            </p>

            <h1 className="mt-1 text-[22px] font-black leading-none tracking-[-0.045em]">
              Deine Nacht beginnt.
            </h1>
          </div>
        </div>

        <Link
          href="/profile"
          aria-label="Profil öffnen"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.055] text-white/60 backdrop-blur-xl transition active:scale-95"
        >
          <UserRound className="h-5 w-5" />
        </Link>
      </header>

      {/* HERO */}
      <section className="relative mt-6 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-purple-600/25 via-pink-600/10 to-blue-600/10 px-6 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        {/* BACKGROUND EFFECTS */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-500/25 blur-[75px]" />

        <div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-pink-500/10 blur-[80px]" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.025] to-transparent" />

        <div className="relative z-10">
          {/* STATUS */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.08em] text-green-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>

                Live
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-[10px] font-bold text-white/45">
                Freitag Nacht
              </span>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
              <Flame className="h-4 w-4 text-pink-400" />
            </div>
          </div>

          {/* LOCATION */}
          <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
            <MapPin className="h-3.5 w-3.5 text-purple-300" />
            Nightlife in deiner Nähe
          </div>

          {/* HEADLINE */}
          <h2 className="mt-3 text-[43px] font-black leading-[0.91] tracking-[-0.065em]">
            Was geht
            <br />
            heute Nacht?
          </h2>

          <p className="mt-4 max-w-[300px] text-[14px] leading-[1.55] text-white/50">
            Entdecke Events, finde deine Crew und sieh,
            wo gerade wirklich etwas abgeht.
          </p>

          {/* PRIMARY CTA */}
          <Link
            href="/swipe"
            className="mt-6 flex h-14 w-full items-center justify-between rounded-[18px] bg-white px-5 font-black text-black transition active:scale-[0.98]"
          >
            <span>Events entdecken</span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>

          {/* SECONDARY CTA */}
          <Link
            href="/trending"
            className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[18px] border border-white/10 bg-white/[0.055] text-sm font-black text-white/75 backdrop-blur-xl transition active:scale-[0.98]"
          >
            <Flame className="h-4 w-4 text-pink-400" />
            Trending heute Nacht
          </Link>
        </div>
      </section>
    </>
  );
}