import Link from "next/link";

import {
  ArrowUpRight,
  Flame,
  Heart,
  Utensils,
  CarFront,
} from "lucide-react";

export default function QuickActions() {
  return (
    <section className="mt-8">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-300">
          SCHNELLZUGRIFF
        </p>

        <h2 className="mt-2 text-[28px] font-black tracking-[-0.045em]">
          Alles für deine Nacht
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <QuickAction
          href="/swipe"
          icon={<Flame className="h-5 w-5" />}
          title="Entdecken"
          subtitle="Events swipen"
          accent="text-pink-300"
          iconBg="bg-pink-500/10"
        />

        <QuickAction
          href="/saved"
          icon={<Heart className="h-5 w-5" />}
          title="Gespeichert"
          subtitle="Deine Favoriten"
          accent="text-red-300"
          iconBg="bg-red-500/10"
        />

        <QuickAction
          href="/food"
          icon={<Utensils className="h-5 w-5" />}
          title="Food"
          subtitle="Late Night Spots"
          accent="text-orange-300"
          iconBg="bg-orange-500/10"
        />

        <QuickAction
          href="/taxi"
          icon={<CarFront className="h-5 w-5" />}
          title="Heimweg"
          subtitle="Taxi & Ride"
          accent="text-cyan-300"
          iconBg="bg-cyan-500/10"
        />
      </div>
    </section>
  );
}

function QuickAction({
  href,
  icon,
  title,
  subtitle,
  accent,
  iconBg,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accent: string;
  iconBg: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035] p-4 transition active:scale-[0.98]"
    >
      <div className="pointer-events-none absolute right-[-40px] top-[-40px] h-24 w-24 rounded-full bg-white/[0.025] blur-2xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 ${iconBg} ${accent}`}
          >
            {icon}
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/25 transition group-hover:text-white/60">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

        <p className="mt-4 text-[15px] font-black">
          {title}
        </p>

        <p className="mt-1 text-[11px] leading-4 text-white/35">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}