"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ONBOARDING_KEY = "noxen-onboarding-complete";
const REGION_KEY = "noxen-region";

export default function StartPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const onboardingComplete =
        localStorage.getItem(ONBOARDING_KEY);

      const region =
        localStorage.getItem(REGION_KEY);

      if (
        onboardingComplete === "true" &&
        region
      ) {
        router.replace("/home");
        return;
      }

      router.replace("/onboarding");
    } catch {
      router.replace("/onboarding");
    }
  }, [router]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-[140px]" />

        <div className="absolute bottom-[-150px] left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-pink-500/15 blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 animate-pulse rounded-full bg-purple-500/20 blur-2xl" />

          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-purple-400" />
        </div>

        <p className="mt-5 text-xs font-black uppercase tracking-[0.3em] text-white/30">
          NOXEN
        </p>
      </div>
    </main>
  );
}