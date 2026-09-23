"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import {
  ArrowRight,
  Check,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const slides = [
  {
    title: "Entdecke Nächte live.",
    text: "Sieh in Echtzeit, wo gerade wirklich etwas geht.",
    badge: "LIVE ENERGY",
    accent:
      "from-pink-500 via-purple-500 to-blue-500",
  },
  {
    title: "Plane mit Freunden.",
    text: "Events, Foodspots und Taxis direkt in einer App.",
    badge: "SOCIAL NIGHTLIFE",
    accent:
      "from-purple-500 via-blue-500 to-cyan-500",
  },
  {
    title: "Nightlife neu gedacht.",
    text: "NOXEN verbindet Clubs, Menschen und spontane Nächte.",
    badge: "BETA ACCESS",
    accent:
      "from-orange-500 via-pink-500 to-purple-500",
  },
];

const ONBOARDING_KEY =
  "noxen-onboarding-complete";

export default function OnboardingPage() {
  const router = useRouter();

  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const completed =
        localStorage.getItem(ONBOARDING_KEY);

      if (completed === "true") {
        router.replace("/home");
        return;
      }

      setReady(true);
    } catch {
      setReady(true);
    }
  }, [router]);

  function nextSlide() {
    if (current < slides.length - 1) {
      setCurrent((value) => value + 1);
      return;
    }

    router.push("/region");
  }

  function skipOnboarding() {
    router.push("/region");
  }

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-purple-400" />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.24),transparent_42%)]" />

      <div className="pointer-events-none absolute bottom-[-260px] left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-pink-500/20 blur-[170px]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-6 top-20 h-36 w-36 rounded-full bg-purple-500/20 blur-[95px]"
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-16 right-0 h-44 w-44 rounded-full bg-blue-500/20 blur-[110px]"
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-lg flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+18px)] pt-[calc(env(safe-area-inset-top)+16px)]">
        <div className="flex items-start justify-between">
          <motion.div
            animate={{
              scale: [1, 1.035, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="absolute inset-3 rounded-full bg-purple-500/20 blur-2xl" />

            <Image
              src="/noxen-logo.png"
              alt="NOXEN"
              width={132}
              height={132}
              priority
              unoptimized
              className="relative h-[118px] w-[118px] object-contain drop-shadow-[0_0_28px_rgba(168,85,247,0.65)] sm:h-[132px] sm:w-[132px]"
            />
          </motion.div>

          <button
            type="button"
            onClick={skipOnboarding}
            className="mt-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/45 backdrop-blur-xl transition hover:bg-white/[0.08] active:scale-95"
          >
            Überspringen
          </button>
        </div>

        <div className="relative -mt-2 flex flex-1 flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.985,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -24,
                scale: 0.985,
              }}
              transition={{
                duration: 0.34,
              }}
              className="flex flex-1 flex-col"
            >
              <div className="text-center">
                <div className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/55 backdrop-blur-xl">
                  {slides[current].badge}
                </div>

                <h1 className="mx-auto mt-5 max-w-[340px] bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-[42px] font-black leading-[0.96] tracking-[-0.055em] text-transparent sm:text-5xl">
                  {slides[current].title}
                </h1>

                <p className="mx-auto mt-4 max-w-[330px] text-sm leading-6 text-white/50 sm:text-base">
                  {slides[current].text}
                </p>
              </div>

              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mx-auto mt-7 w-full max-w-[360px] rounded-[30px] border border-white/10 bg-white/[0.05] p-4 shadow-[0_0_70px_rgba(168,85,247,0.12)] backdrop-blur-3xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35">
                      LIVE IN
                    </p>

                    <div className="mt-1.5 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple-300" />

                      <h2 className="text-2xl font-black">
                        Köln
                      </h2>
                    </div>
                  </div>

                  <div
                    className={`rounded-full bg-gradient-to-r ${slides[current].accent} px-3.5 py-2 text-xs font-black text-white`}
                  >
                    98%
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-[24px] border border-white/10 bg-black">
                  <div
                    className={`relative h-36 bg-gradient-to-br ${slides[current].accent}`}
                  >
                    <div className="absolute inset-0 bg-black/20" />

                    <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-[10px] font-black backdrop-blur-xl">
                      ● LIVE NOW
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                        Tonight
                      </p>

                      <h3 className="mt-1 text-2xl font-black">
                        BLACKROOM
                      </h3>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-white/45">
                      Bootshaus · Techno · 23:00
                    </p>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <MiniStat
                        icon={
                          <Users className="h-3.5 w-3.5" />
                        }
                        value="1.2K"
                        label="Crowd"
                      />

                      <MiniStat
                        icon={
                          <Sparkles className="h-3.5 w-3.5" />
                        }
                        value="98%"
                        label="Heat"
                      />

                      <MiniStat
                        icon={
                          <ShieldCheck className="h-3.5 w-3.5" />
                        }
                        value="Live"
                        label="Status"
                      />
                    </div>

                    <div className="mt-4 h-[5px] overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        animate={{
                          x: ["-100%", "220%"],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className={`h-full w-[45%] rounded-full bg-gradient-to-r ${slides[current].accent}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5">
            <div className="mb-4 flex justify-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    setCurrent(index)
                  }
                  aria-label={`Onboarding Schritt ${
                    index + 1
                  }`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-9 bg-gradient-to-r from-pink-500 to-purple-500"
                      : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              className="mx-auto flex h-15 w-full max-w-[360px] items-center justify-center gap-3 rounded-[22px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-4 text-xs font-black uppercase tracking-[0.22em] text-white shadow-[0_0_34px_rgba(168,85,247,0.38)] transition hover:scale-[1.01] active:scale-[0.98]"
            >
              {current === slides.length - 1 ? (
                <>
                  <Check className="h-4 w-4" />
                  REGION WÄHLEN
                </>
              ) : (
                <>
                  WEITER
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="mt-3 text-center text-[10px] text-white/25">
              Schritt {current + 1} von{" "}
              {slides.length}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function MiniStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
      <div className="text-purple-300">
        {icon}
      </div>

      <p className="mt-1.5 text-xs font-black">
        {value}
      </p>

      <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.1em] text-white/30">
        {label}
      </p>
    </div>
  );
}