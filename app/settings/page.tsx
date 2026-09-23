"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  CircleHelp,
  FileText,
  Info,
  Lock,
  LogOut,
  MapPin,
  ShieldCheck,
  Smartphone,
  User,
} from "lucide-react";

import BottomNav from "../components/bottom-nav";

export default function SettingsPage() {
  const router = useRouter();

  function resetOnboarding() {
    localStorage.removeItem(
      "noxen-onboarding-complete"
    );

    router.push("/onboarding");
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black pb-36 text-white">
      <div className="pointer-events-none fixed bottom-[-150px] right-[-100px] h-[350px] w-[350px] rounded-full bg-purple-500/15 blur-[140px]" />

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
            onClick={() => router.back()}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/30">
              NOXEN
            </p>

            <h1 className="mt-1 text-3xl font-black">
              Einstellungen
            </h1>
          </div>
        </header>

        <section className="mt-8">
          <p className="mb-3 px-1 text-[10px] font-black uppercase tracking-[0.28em] text-white/30">
            ACCOUNT
          </p>

          <div className="space-y-3">
            <SettingRow
              icon={<User className="h-5 w-5" />}
              title="Profil bearbeiten"
              subtitle="@ben.jolas"
            />

            <SettingRow
              icon={<MapPin className="h-5 w-5" />}
              title="Region"
              subtitle="Nordrhein-Westfalen"
              onClick={() => router.push("/region")}
            />

            <SettingRow
              icon={<Bell className="h-5 w-5" />}
              title="Benachrichtigungen"
              subtitle="Live Alerts & Events"
              onClick={() =>
                router.push("/notifications")
              }
            />

            <SettingRow
              icon={<Lock className="h-5 w-5" />}
              title="Privatsphäre"
              subtitle="Account & Datenschutz"
            />
          </div>
        </section>

        <section className="mt-8">
          <p className="mb-3 px-1 text-[10px] font-black uppercase tracking-[0.28em] text-white/30">
            APP
          </p>

          <div className="space-y-3">
            <SettingRow
              icon={<Smartphone className="h-5 w-5" />}
              title="Onboarding erneut starten"
              subtitle="NOXEN Einführung ansehen"
              onClick={resetOnboarding}
            />

            <SettingRow
              icon={<CircleHelp className="h-5 w-5" />}
              title="Hilfe & Feedback"
              subtitle="Beta Feedback senden"
              onClick={() =>
                router.push("/feedback")
              }
            />

            <SettingRow
              icon={<Info className="h-5 w-5" />}
              title="Über NOXEN"
              subtitle="Beta Version 0.1"
            />
          </div>
        </section>

        <section className="mt-8">
          <p className="mb-3 px-1 text-[10px] font-black uppercase tracking-[0.28em] text-white/30">
            RECHTLICHES
          </p>

          <div className="space-y-3">
            <SettingRow
              icon={<FileText className="h-5 w-5" />}
              title="Datenschutz"
              subtitle="Datenschutzerklärung"
            />

            <SettingRow
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Impressum"
              subtitle="Rechtliche Angaben"
            />
          </div>
        </section>

        <button
          type="button"
          className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-[22px] border border-red-500/20 bg-red-500/10 font-black text-red-300"
        >
          <LogOut className="h-5 w-5" />
          Abmelden
        </button>

        <p className="mt-7 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-white/20">
          NOXEN BETA · VERSION 0.1
        </p>
      </div>

      <BottomNav />
    </main>
  );
}

function SettingRow({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.04] p-4 text-left transition active:scale-[0.98] active:bg-white/[0.07]"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-white/60">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-black">
            {title}
          </p>

          <p className="mt-1 truncate text-xs text-white/35">
            {subtitle}
          </p>
        </div>
      </div>

      <ChevronRight className="h-5 w-5 shrink-0 text-white/20" />
    </button>
  );
}