"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // পেজ বদলালেই চেক করো Login করা আছে কিনা
  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    }
    checkUser();
  }, [pathname]);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    setOpen(false);
    router.push("/signin");
  }

  // Login থাকলে Dashboard link যোগ হবে
  const links = [
    { name: "Home", href: "/" },
    { name: "contract", href: "/contract" },
    ...(user ? [{ name: "Dashboard", href: "/dashboard" }] : []),
  ];

  function linkStyle(href: string) {
    if (pathname === href) {
      return "text-indigo-600 dark:text-indigo-400 font-semibold";
    }
    return "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white";
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          MyAuthApp
        </Link>

        {/* বড় screen-এর মেনু */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${linkStyle(item.href)}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* বড় screen-এর ডান পাশ */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-lg px-4 py-2 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* মোবাইলের মেনু button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl text-slate-700 dark:text-slate-200 md:hidden"
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* মোবাইলের মেনু */}
      {open && (
        <div className="space-y-1 border-t border-slate-200 px-6 py-4 dark:border-slate-800 md:hidden">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm ${linkStyle(item.href)}`}
            >
              {item.name}
            </Link>
          ))}

          {user ? (
            <div className="pt-3">
              <p className="px-3 pb-2 text-sm text-slate-500 dark:text-slate-400">
                {user.name}
              </p>
              <button
                onClick={handleLogout}
                className="w-full rounded-lg bg-red-600 py-2 text-sm font-medium text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3 pt-3">
              <Link
                href="/signin"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-lg border border-slate-300 py-2 text-center text-sm text-slate-700 dark:border-slate-700 dark:text-slate-300"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-lg bg-indigo-600 py-2 text-center text-sm font-medium text-white"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}