import Link from "next/link";

import {
  ArrowUpRight,
  Heart,
  Users,
} from "lucide-react";

export default function Crew() {
  return (
    <section className="relative mt-9 overflow-hidden rounded-[30px] border border-cyan-400/10 bg-gradient-to-br from-cyan-500/[0.08] via-white/[0.035] to-purple-500/[0.08] p-5">
      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-[70px]" />

      <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-purple-500/10 blur-[70px]" />

      <div className="relative z-10">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-500/10 text-cyan-300">
              <Users className="h-4 w-4" />
            </div>

            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">
              DEINE CREW
            </p>
          </div>

          <div className="flex items-center">
            <Avatar label="B" />
            <Avatar label="S" offset />
            <Avatar icon={<Heart className="h-3 w-3" />} offset />
          </div>
        </div>

        {/* CONTENT */}
        <h2 className="mt-5 text-[28px] font-black leading-[1] tracking-[-0.05em]">
          Nicht alleine
          <br />
          feiern.
        </h2>

        <p className="mt-3 max-w-[310px] text-[13px] leading-[1.6] text-white/45">
          Speichere Events, teile deine Pläne und findet gemeinsam den besten
          Spot für heute Nacht.
        </p>

        {/* CTA */}
        <Link
          href="/saved"
          className="mt-5 flex h-13 w-full items-center justify-between rounded-[18px] bg-white px-5 py-4 font-black text-black transition active:scale-[0.98]"
        >
          <span>Crew planen</span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}

function Avatar({
  label,
  icon,
  offset = false,
}: {
  label?: string;
  icon?: React.ReactNode;
  offset?: boolean;
}) {
  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white/[0.09] text-[10px] font-black text-white/70 ${
        offset ? "-ml-2" : ""
      }`}
    >
      {icon || label}
    </div>
  );
}