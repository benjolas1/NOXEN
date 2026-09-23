import {
  Flame,
  Headphones,
  MapPin,
  Radio,
  Sparkles,
  Users,
} from "lucide-react";

export default function LiveNow() {
  return (
    <section className="mt-9">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-300">
          LIVE NOW
        </p>

        <h2 className="mt-2 text-[28px] font-black tracking-[-0.045em]">
          Hier geht gerade was
        </h2>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <LiveCard
          icon={<Headphones className="h-5 w-5" />}
          title="Bootshaus"
          location="Köln"
          people="1.284"
          heat="98%"
          accent="text-purple-300"
          iconBg="bg-purple-500/15"
        />

        <LiveCard
          icon={<Sparkles className="h-5 w-5" />}
          title="Club Bahnhof Ehrenfeld"
          location="Köln"
          people="846"
          heat="94%"
          accent="text-pink-300"
          iconBg="bg-pink-500/15"
        />

        <LiveCard
          icon={<Radio className="h-5 w-5" />}
          title="Nachtleben Düsseldorf"
          location="Düsseldorf"
          people="623"
          heat="89%"
          accent="text-cyan-300"
          iconBg="bg-cyan-500/15"
        />
      </div>
    </section>
  );
}

function LiveCard({
  icon,
  title,
  location,
  people,
  heat,
  accent,
  iconBg,
}: {
  icon: React.ReactNode;
  title: string;
  location: string;
  people: string;
  heat: string;
  accent: string;
  iconBg: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] p-4">
      <div className="pointer-events-none absolute right-[-55px] top-[-55px] h-28 w-28 rounded-full bg-purple-500/[0.06] blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 ${iconBg} ${accent}`}
          >
            {icon}
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-orange-400/10 bg-orange-500/10 px-3 py-2 text-[11px] font-black text-orange-300">
            <Flame className="h-3.5 w-3.5" />
            {heat}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="line-clamp-1 text-[18px] font-black tracking-[-0.02em]">
            {title}
          </h3>

          <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-white/40">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </div>
        </div>

        <div className="mt-4 h-px bg-white/10" />

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>

            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/35">
              Live
            </span>
          </div>

          <div className="flex items-center gap-2 text-[12px] font-black text-white/65">
            <Users className="h-4 w-4 text-white/35" />
            {people}
          </div>
        </div>
      </div>
    </article>
  );
}