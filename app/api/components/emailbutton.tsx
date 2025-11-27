"use client";

import { useState } from "react";

export default function TestEmailButton() {
  const [email, setEmail] = useState("");
  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSend() {
    if (!email) {
      setStatus("error");
      setMessage("Enter an email first.");
      return;
    }

    try {
      setStatus("loading");
      setMessage("");

      const res = await fetch("/api/send-test-check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage("Something went wrong sending the email.");
        return;
      }

      setStatus("success");
      setMessage("Test email sent! Check your inbox (and spam).");
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <div className="mt-6 max-w-md space-y-2">
      <label className="text-xs text-zinc-400">
        Send a real test email from{" "}
        <span className="font-mono text-red-400">studybuddy@studymaxxing.app</span>
      </label>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-red-600"
        />
        <button
          onClick={handleSend}
          disabled={status === "loading"}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send test"}
        </button>
      </div>
      {message && (
        <p
          className={`text-xs ${
            status === "success" ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
