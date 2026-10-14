"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push("/signin");
      }
    }
    loadUser();
  }, [router]);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/signin");
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 px-4 py-10">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-indigo-600 opacity-20 blur-3xl dark:opacity-10"></div>
        <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-purple-600 opacity-20 blur-3xl dark:opacity-10"></div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"></div>
          <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700"></div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Account Age", value: "Active", icon: "📅", color: "bg-emerald-500" },
    { label: "Last Login", value: "Today", icon: "🕐", color: "bg-indigo-500" },
    { label: "Security", value: "Secure", icon: "🔒", color: "bg-amber-500" },
    { label: "Sessions", value: "1 Active", icon: "📱", color: "bg-purple-500" },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Background blobs */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-indigo-600 opacity-15 blur-3xl dark:opacity-10"></div>
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-purple-600 opacity-15 blur-3xl dark:opacity-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-600/5 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Welcome back, <span className="text-indigo-600 dark:text-indigo-400">{user.name}</span>
            </h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">Here&apos;s what&apos;s happening with your account</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 backdrop-blur-sm transition-all hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500 hover:shadow-red-500/40 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Profile Card + Stats Grid */}
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Profile Sidebar */}
          <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 shadow-xl backdrop-blur-sm">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className={`h-24 w-24 rounded-full ${stats[0].color} flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-black/10`}>
                  {getInitials(user.name)}
                </div>
                <span className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900"></span>
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{user.name}</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                Active Session
              </span>

              <div className="mt-6 w-full border-t border-slate-200 dark:border-slate-800 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">#{user.id}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">User ID</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">7 Days</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Session Left</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <div className={`h-10 w-10 rounded-xl ${stat.color} flex items-center justify-center text-xl`}>
                      {stat.icon}
                    </div>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</span>
                  </div>
                  <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Account Details */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="h-5 w-5 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">👤</span>
                Account Information
              </h3>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-slate-500 dark:text-slate-400">Full Name</dt>
                  <dd className="mt-1 font-medium text-slate-900 dark:text-white">{user.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-500 dark:text-slate-400">Email Address</dt>
                  <dd className="mt-1 font-medium text-slate-900 dark:text-white">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-500 dark:text-slate-400">User ID</dt>
                  <dd className="mt-1 font-medium text-slate-900 dark:text-white font-mono">#{user.id}</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-500 dark:text-slate-400">Status</dt>
                  <dd className="mt-1 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">Active</span>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Security Section */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="h-5 w-5 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">🔒</span>
                Security & Privacy
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">🔑</div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Password Protection</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Bcrypt hashed with salt</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Enabled</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">🍪</div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Session Management</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">HTTP-only secure cookies</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Active</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">🛡️</div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Token Expiry</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">7 days auto-renewal</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Configured</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="h-5 w-5 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">⚡</span>
                Quick Actions
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-left transition-all hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">✏️</div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Edit Profile</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Update your information</p>
                  </div>
                </button>
                <button
                  className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-left transition-all hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">🔐</div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Change Password</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Update your password</p>
                  </div>
                </button>
                <button
                  className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-left transition-all hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">📱</div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Manage Sessions</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">View active logins</p>
                  </div>
                </button>
                <button
                  className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-left transition-all hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">🚪</div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Logout Everywhere</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Revoke all sessions</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}