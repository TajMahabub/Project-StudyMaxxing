"use client";
import TestEmailButton from "./api/components/emailbutton";
import { useEffect, useState } from "react";
export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 100; // how far before the circle is "tight"
      const current = Math.min(window.scrollY, maxScroll);
      setScrollProgress(current / maxScroll); // 0 → 1
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 0 = big red, 1 = small red circle
  const innerRadius = 65 - scrollProgress * 40; // percentage

  const heroBackground = {
    background: `radial-gradient(circle at center,
      rgba(230, 0, 0, 1) ${innerRadius}%,
      #000 100%)`,
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAVIGATION BAR */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-900/80 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3 text-sm">
          <div className="font-semibold tracking-tight">
            StudyMaxxing
          </div>
          <ul className="flex gap-6">
            <li>
              <a href="#features" className="hover:text-zinc-300">
                Features
              </a>
            </li>
            <li>
              <a href="#dashboard" className="hover:text-zinc-300">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#lockin" className="hover:text-zinc-300">
                Lock-in
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-zinc-300">
                About
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main HOME */}
      <section
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden"
        style={heroBackground}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl md:text-7xl">
            Procrastinating again? Same.
          </h1>
          <p className="mt-6 text-base text-zinc-100 sm:text-lg">
            Turn chaos into consistency — one study streak at a time.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <a
              href="#lockin"
              className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition hover:scale-105 hover:bg-zinc-100"
            >
              Lock-in
            </a>
            <a
              href="#dashboard"
              className="rounded-full border border-white/60 px-6 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              View Dashboard
            </a>
          </div>
        </div>
      </section>

      {/* Features subdivider. */}
      <section
  id="features"
  className="mx-auto max-w-5xl px-6 py-16 text-zinc-100"
>
  <h2 className="text-2xl font-semibold">Features</h2>
  <p className="mt-3 max-w-xl text-sm text-zinc-300">
    Streaks tracking, lock-in sessions, and Maxx AI – your personal study buddy
    keeping you on your grind. Here&apos;s the first thing Maxx does for you:
  </p>

  {/* First Feature Automated email check-ins - maybe implement in future to SMS? */}
  <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr,1.2fr] items-center">
    {/* Text side */}
    <div>
      <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-300">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        Automated Email Check-ins
      </div>

      <h3 className="mt-4 text-xl font-semibold">
        Maxx AI nudges you when it&apos;s time to lock in.
      </h3>
      <p className="mt-3 text-sm text-zinc-300">
        Pick your study windows and Maxx AI sends clean, no-nonsense reminders
        straight to your inbox – so “I forgot” stops being an excuse. Check-ins
        can be gentle, sarcastic, or brutally honest. Your choice.
      </p>
      <ul className="mt-4 space-y-2 text-sm text-zinc-300">
        <li>• Daily and weekly lock-in reminders</li>
        <li>• Session recap emails after each focus block</li>
        <li>• Sent from <span className="font-mono text-xs">studybuddy@studymaxxing.app</span></li>
      </ul>
      <TestEmailButton />
    </div>

    {/* Visual example  */}
    <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
      <div className="mb-4 flex items-center justify-between text-xs text-zinc-400">
        <span className="font-medium">Inbox · Today</span>
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-green-500" />
        </div>
      </div>

      <div className="rounded-xl border border-white/5 bg-black/60 p-4">
        <p className="text-[11px] text-zinc-400">
          From: <span className="font-medium text-zinc-100">Maxx AI</span>{" "}
          &lt;studybuddy@studymaxxing.app&gt;
        </p>
        <p className="mt-1 text-[11px] text-zinc-400">
          Subject: <span className="text-zinc-100">Time to lock in 🔒</span>
        </p>

        <div className="mt-4 space-y-2 text-sm text-zinc-100">
          <p>Hey, you said this hour was for studying.</p>
          <p>
            Your lock-in window starts <span className="font-semibold">now</span>.
            Put your phone down, open your notes, and I&apos;ll count this towards
            your streak.
          </p>
          <p className="text-xs text-zinc-400 mt-3">
            · Maxx is tracking this session for your weekly report.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


      <section
        id="dashboard"
        className="mx-auto max-w-5xl px-6 py-16 text-zinc-100"
      >
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="mt-4 text-sm text-zinc-300">
          A clean overview of your weekly focus time, streaks, and
          upcoming sessions.
        </p>
      </section>

      <section
        id="lockin"
        className="mx-auto max-w-5xl px-6 py-16 text-zinc-100"
      >
        <h2 className="text-2xl font-semibold">Lock-in Sessions</h2>
        <p className="mt-4 text-sm text-zinc-300">
          Set a timer, mute distractions, and let StudyMaxxing send
          you reminders and accountability check-ins.
        </p>
      </section>

      <section
        id="about"
        className="mx-auto max-w-5xl px-6 py-16 text-zinc-100"
      >
        <h2 className="text-2xl font-semibold">About</h2>
        <p className="mt-4 text-sm text-zinc-300">
          Built by Taj Mahabub - Mechanical engineering student who got tired of pretending
          he&apos;d start &quot;tomorrow.&quot; StudyMaxxing is your
          system to stop restarting from zero and get those W's in.
        </p>
      </section>
    </main>
  );
}
