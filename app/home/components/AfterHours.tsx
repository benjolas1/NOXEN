import Link from "next/link";

import {
  ArrowUpRight,
  CarFront,
  Utensils,
} from "lucide-react";

export default function AfterHours() {
  return (
    <section className="mt-9">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-300">
          AFTER HOURS
        </p>

        <h2 className="mt-2 text-[28px] font-black tracking-[-0.045em]">
          Wenn die Nacht endet
        </h2>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <AfterHoursCard
          href="/food"
          icon={<Utensils className="h-5 w-5" />}
          label="LATE NIGHT"
          title="Noch Hunger?"
          description="Entdecke Foodspots, die auch dann noch offen sind, wenn der Rest der Stadt schon schläft."
          action="Foodspots ansehen"
          accent="orange"
        />

        <AfterHoursCard
          href="/taxi"
          icon={<CarFront className="h-5 w-5" />}
          label="GET HOME"
          title="Sicher nach Hause."
          description="Taxi finden, Ride-App öffnen oder gemeinsam mit deiner Crew den Heimweg planen."
          action="Heimweg planen"
          accent="cyan"
        />
      </div>
    </section>
  );
}

function AfterHoursCard({
  href,
  icon,
  label,
  title,
  description,
  action,
  accent,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  action: string;
  accent: "orange" | "cyan";
}) {
  const isOrange = accent === "orange";

  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-[28px] border p-5 transition active:scale-[0.98] ${
        isOrange
          ? "border-orange-400/10 bg-gradient-to-br from-orange-500/[0.12] via-white/[0.035] to-pink-500/[0.06]"
          : "border-cyan-400/10 bg-gradient-to-br from-cyan-500/[0.12] via-white/[0.035] to-purple-500/[0.07]"
      }`}
    >
      {/* BACKGROUND GLOW */}
      <div
        className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-[60px] ${
          isOrange
            ? "bg-orange-500/15"
            : "bg-cyan-500/15"
        }`}
      />

      <div className="relative z-10">
        {/* TOP */}
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 ${
              isOrange
                ? "bg-orange-500/10 text-orange-300"
                : "bg-cyan-500/10 text-cyan-300"
            }`}
          >
            {icon}
          </div>

          <span
            className={`text-[9px] font-black uppercase tracking-[0.2em] ${
              isOrange
                ? "text-orange-300/70"
                : "text-cyan-300/70"
            }`}
          >
            {label}
          </span>
        </div>

        {/* CONTENT */}
        <h3 className="mt-5 text-[22px] font-black tracking-[-0.035em]">
          {title}
        </h3>

        <p className="mt-2 min-h-[60px] text-[12px] leading-[1.6] text-white/40">
          {description}
        </p>

        {/* ACTION */}
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span
            className={`text-[12px] font-black ${
              isOrange
                ? "text-orange-300"
                : "text-cyan-300"
            }`}
          >
            {action}
          </span>

          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 ${
              isOrange
                ? "bg-orange-500/10 text-orange-300"
                : "bg-cyan-500/10 text-cyan-300"
            }`}
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}