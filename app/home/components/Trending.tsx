import Link from "next/link";

import {
  ArrowRight,
  Flame,
  MapPin,
  Sparkles,
  Zap,
} from "lucide-react";

export default function Trending() {
  return (
    <section className="mt-9">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-300">
            TRENDING
          </p>

          <h2 className="mt-2 text-[28px] font-black tracking-[-0.045em]">
            Heute angesagt
          </h2>
        </div>

        <Link
          href="/trending"
          className="flex shrink-0 items-center gap-1.5 pb-1 text-[11px] font-black text-purple-300 transition active:scale-95"
        >
          Alle
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        <TrendingRow
          rank="01"
          icon={<Flame className="h-5 w-5" />}
          title="Bootshaus Friday"
          city="Köln"
          heat="98"
          accent="text-pink-300"
          iconBg="bg-pink-500/10"
          top
        />

        <TrendingRow
          rank="02"
          icon={<Zap className="h-5 w-5" />}
          title="Techno District"
          city="Düsseldorf"
          heat="94"
          accent="text-purple-300"
          iconBg="bg-purple-500/10"
        />

        <TrendingRow
          rank="03"
          icon={<Sparkles className="h-5 w-5" />}
          title="NOXEN Night"
          city="NRW"
          heat="91"
          accent="text-blue-300"
          iconBg="bg-blue-500/10"
        />
      </div>
    </section>
  );
}

function TrendingRow({
  rank,
  icon,
  title,
  city,
  heat,
  accent,
  iconBg,
  top = false,
}: {
  rank: string;
  icon: React.ReactNode;
  title: string;
  city: string;
  heat: string;
  accent: string;
  iconBg: string;
  top?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border p-4 ${
        top
          ? "border-purple-400/20 bg-gradient-to-r from-purple-500/[0.09] via-white/[0.04] to-pink-500/[0.06]"
          : "border-white/10 bg-white/[0.035]"
      }`}
    >
      {top && (
        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-pink-500/10 blur-3xl" />
      )}

      <div className="relative z-10 flex items-center gap-3">
        <div className="w-7 shrink-0 text-center">
          <p
            className={`text-[12px] font-black ${
              top
                ? "text-purple-300"
                : "text-white/25"
            }`}
          >
            {rank}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 ${iconBg} ${accent}`}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-[14px] font-black">
              {title}
            </p>

            {top && (
              <span className="shrink-0 rounded-full bg-purple-500/15 px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-purple-300">
                #1
              </span>
            )}
          </div>

          <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-white/35">
            <span>Heute</span>

            <span className="text-white/15">•</span>

            <MapPin className="h-3 w-3" />

            <span className="truncate">
              {city}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-orange-400/10 bg-orange-500/10 px-2.5 py-2 text-[10px] font-black text-orange-300">
          <Flame className="h-3.5 w-3.5" />
          {heat}%
        </div>
      </div>
    </div>
  );
}