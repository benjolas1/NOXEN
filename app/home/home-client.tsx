"use client";

import BottomNav from "../components/bottom-nav";

import Hero from "./components/Hero";
import QuickActions from "./components/QuickActions";
import LiveNow from "./components/LiveNow";
import Trending from "./components/Trending";
import Crew from "./components/Crew";
import AfterHours from "./components/AfterHours";

export default function HomeClient() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      {/* PREMIUM BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-150px] top-[-170px] h-[360px] w-[360px] rounded-full bg-purple-600/20 blur-[150px]" />

        <div className="absolute right-[-170px] top-[28%] h-[340px] w-[340px] rounded-full bg-pink-600/15 blur-[150px]" />

        <div className="absolute bottom-[-180px] left-[15%] h-[360px] w-[360px] rounded-full bg-blue-600/10 blur-[160px]" />

        <div className="absolute left-1/2 top-[45%] h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-purple-500/[0.05] blur-[130px]" />
      </div>

      {/* SUBTLE TOP GLOW */}
      <div className="pointer-events-none fixed left-0 right-0 top-0 h-32 bg-gradient-to-b from-purple-950/10 to-transparent" />

      {/* HOME CONTENT */}
      <div
        className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-36"
        style={{
          paddingTop:
            "max(54px, calc(env(safe-area-inset-top, 0px) + 50px))",
        }}
      >
        <Hero />

        <QuickActions />

        <LiveNow />

        <Trending />

        <Crew />

        <AfterHours />
      </div>

      {/* GLOBAL BOTTOM NAVIGATION */}
      <BottomNav />
    </main>
  );
}