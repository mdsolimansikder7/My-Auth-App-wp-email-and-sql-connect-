
"use client";

import { useState } from "react";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Failed to submit your lead."
        );
      }

      setSuccess(data.message || "Lead submitted successfully.");

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

      // Open WhatsApp with a prefilled lead message
      if (data.whatsappUrl) {
        window.location.href = data.whatsappUrl;
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not connect to the server."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle =
    "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30";

  const labelStyle =
    "mb-1 block text-sm text-slate-600 dark:text-slate-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelStyle}>Name</label>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={150}
          required
          className={inputStyle}
        />
      </div>

      <div>
        <label className={labelStyle}>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={255}
          required
          className={inputStyle}
        />
      </div>

      <div>
        <label className={labelStyle}>Phone</label>
        <input
          type="tel"
          placeholder="01XXXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={30}
          className={inputStyle}
        />
      </div>

      <div>
        <label className={labelStyle}>Message</label>
        <textarea
          placeholder="How can we help you?"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={5000}
          className={inputStyle}
        />
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="rounded-lg border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400"
        >
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Send Message"}
      </button>
    </form>
  );
}
