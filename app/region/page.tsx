"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Check,
  MapPin,
  Navigation,
  Search,
  ArrowRight,
} from "lucide-react";

import BottomNav from "../components/bottom-nav";

const regions = [
  {
    id: "koeln",
    city: "Köln",
    area: "Nordrhein-Westfalen",
    emoji: "🌃",
  },
  {
    id: "dueren",
    city: "Düren",
    area: "Nordrhein-Westfalen",
    emoji: "🔥",
  },
  {
    id: "aachen",
    city: "Aachen",
    area: "Nordrhein-Westfalen",
    emoji: "🌙",
  },
  {
    id: "saarbruecken",
    city: "Saarbrücken",
    area: "Saarland",
    emoji: "⚡",
  },
];

const STORAGE_KEY = "noxen-region";
const ONBOARDING_KEY = "noxen-onboarding-complete";

export default function RegionPage() {
  const router = useRouter();

  const [selected, setSelected] = useState("koeln");
  const [search, setSearch] = useState("");
  const [ready, setReady] = useState(false);
  const [firstSetup, setFirstSetup] = useState(false);

  useEffect(() => {
    try {
      const storedRegion =
        localStorage.getItem(STORAGE_KEY);

      const onboardingComplete =
        localStorage.getItem(ONBOARDING_KEY);

      if (storedRegion) {
        setSelected(storedRegion);
      }

      setFirstSetup(onboardingComplete !== "true");
    } catch {
      setFirstSetup(true);
    } finally {
      setReady(true);
    }
  }, []);

  function selectRegion(id: string) {
    setSelected(id);

    if (!firstSetup) {
      localStorage.setItem(STORAGE_KEY, id);
    }
  }

  function finishSetup() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        selected
      );

      localStorage.setItem(
        ONBOARDING_KEY,
        "true"
      );

      router.replace("/home");
    } catch (error) {
      console.error(
        "Region konnte nicht gespeichert werden:",
        error
      );
    }
  }

  function goBack() {
    if (firstSetup) {
      router.push("/onboarding");
      return;
    }

    router.back();
  }

  const filteredRegions = regions.filter(
    (region) =>
      `${region.city} ${region.area}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const selectedRegion = regions.find(
    (region) => region.id === selected
  );

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-blue-400" />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black pb-36 text-white">
      <div className="pointer-events-none fixed left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-blue-500/15 blur-[140px]" />

      <div className="pointer-events-none fixed bottom-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-purple-500/15 blur-[140px]" />

      <div
        className="relative z-10 mx-auto w-full max-w-md px-5"
        style={{
          paddingTop:
            "max(56px, calc(env(safe-area-inset-top) + 28px))",
        }}
      >
        <header className="flex items-center gap-4">
          <button
            type="button"
            onClick={goBack}
            aria-label="Zurück"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] transition active:scale-95"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-blue-300">
              {firstSetup
                ? "LETZTER SCHRITT"
                : "LOCATION"}
            </p>

            <h1 className="mt-1 text-3xl font-black">
              Deine Region
            </h1>
          </div>
        </header>

        <p className="mt-6 text-sm leading-6 text-white/45">
          NOXEN zeigt dir Events, Foodspots und
          Nightlife passend zu deiner Region.
        </p>

        <div className="mt-6 flex h-14 items-center gap-3 rounded-[20px] border border-white/10 bg-white/[0.05] px-4">
          <Search className="h-5 w-5 text-white/30" />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Stadt suchen"
            className="h-full flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/25"
          />
        </div>

        <button
          type="button"
          className="mt-4 flex w-full items-center gap-4 rounded-[24px] border border-blue-500/20 bg-blue-500/10 p-4 text-left opacity-60"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/15">
            <Navigation className="h-5 w-5 text-blue-300" />
          </div>

          <div>
            <p className="text-sm font-black">
              Aktuellen Standort verwenden
            </p>

            <p className="mt-1 text-xs text-white/35">
              Standorterkennung folgt in Kürze
            </p>
          </div>
        </button>

        <section className="mt-8">
          <p className="mb-3 px-1 text-[10px] font-black uppercase tracking-[0.28em] text-white/30">
            REGION AUSWÄHLEN
          </p>

          <div className="space-y-3">
            {filteredRegions.length > 0 ? (
              filteredRegions.map((region) => {
                const active =
                  selected === region.id;

                return (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() =>
                      selectRegion(region.id)
                    }
                    className={`flex w-full items-center justify-between rounded-[25px] border p-4 text-left transition active:scale-[0.98] ${
                      active
                        ? "border-blue-400/30 bg-blue-500/10"
                        : "border-white/10 bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] text-xl">
                        {region.emoji}
                      </div>

                      <div>
                        <p className="font-black">
                          {region.city}
                        </p>

                        <p className="mt-1 text-xs text-white/35">
                          {region.area}
                        </p>
                      </div>
                    </div>

                    {active ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                        <Check className="h-4 w-4" />
                      </div>
                    ) : (
                      <MapPin className="h-5 w-5 text-white/20" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="rounded-[25px] border border-white/10 bg-white/[0.03] px-5 py-10 text-center">
                <MapPin className="mx-auto h-7 w-7 text-white/20" />

                <p className="mt-4 font-black text-white/60">
                  Keine Region gefunden
                </p>

                <p className="mt-2 text-xs text-white/30">
                  Weitere Städte kommen nach und
                  nach zu NOXEN.
                </p>
              </div>
            )}
          </div>
        </section>

        {firstSetup ? (
          <div className="mt-8">
            <div className="mb-4 rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                AUSGEWÄHLT
              </p>

              <div className="mt-2 flex items-center gap-3">
                <span className="text-xl">
                  {selectedRegion?.emoji}
                </span>

                <div>
                  <p className="font-black">
                    {selectedRegion?.city}
                  </p>

                  <p className="text-xs text-white/35">
                    {selectedRegion?.area}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={finishSetup}
              className="flex h-16 w-full items-center justify-center gap-3 rounded-[24px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_0_40px_rgba(168,85,247,0.35)] transition active:scale-[0.98]"
            >
              NOXEN STARTEN
              <ArrowRight className="h-5 w-5" />
            </button>

            <p className="mt-4 text-center text-xs text-white/25">
              Du kannst deine Region später jederzeit
              ändern.
            </p>
          </div>
        ) : (
          <p className="mt-7 text-center text-xs text-white/25">
            Deine Auswahl wird automatisch gespeichert.
          </p>
        )}
      </div>

      {!firstSetup && <BottomNav />}
    </main>
  );
}