import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600 opacity-20 blur-3xl dark:opacity-10"></div>
      <div className="absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-purple-600 opacity-20 blur-3xl dark:opacity-10"></div>

      <main className="relative z-10 mx-auto max-w-4xl px-6 pt-20 text-center">
        <span className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-1 text-sm text-indigo-600 dark:text-indigo-400">
          Next.js + MySQL
        </span>

        <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-6xl">
          Secure Login System,
          <br />
          <span className="text-indigo-600 dark:text-indigo-400">Made Simple</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-500 dark:text-slate-400">
          Create your account, sign in securely, and access everything from your
          personalized dashboard.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-colors hover:bg-indigo-500"
          >
            Get Started
          </Link>
          <Link
            href="/signin"
            className="rounded-xl border border-slate-300 px-8 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Sign In
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-slate-300 px-8 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Contact Us
          </Link>
        </div>
      </main>

      <section className="relative z-10 mx-auto mt-24 grid max-w-5xl gap-6 px-6 pb-16 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="text-3xl">🔒</div>
          <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
            Secure Passwords
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Passwords are hashed and salted before storage. No one can see your
            actual password.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="text-3xl">⚡</div>
          <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
            Fast Login
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Stay logged in for 7 days with secure HTTP-only cookies. No need to
            sign in again.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="text-3xl">📊</div>
          <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
            Personal Dashboard
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            View your profile information and log out anytime with a single
            click.
          </p>
        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-200 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © 2026 MyAuthApp. All rights reserved.
      </footer>
    </div>
  );
}