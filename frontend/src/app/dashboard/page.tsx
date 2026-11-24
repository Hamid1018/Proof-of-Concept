
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/hooks/use-auth";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  if (loading || !isAuthenticated || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Loading dashboard...</p>
      </main>
    );
  }

  const isAdmin = user.role === "ADMIN";

  return (
    <main className="min-h-screen bg-slate-100">
      <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-blue-700">
          Contest Platform
        </h1>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Logout
        </button>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Welcome, {user.first_name}!
          </h2>

          <p className="mt-2 text-slate-600">
            You are logged in as{" "}
            <span className="font-semibold">{user.role}</span>.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {user.email}
          </p>
        </div>

        {isAdmin ? (
          <section>
            <h3 className="mb-5 text-2xl font-bold text-slate-900">
              Admin Dashboard
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <Link
  href="/admin/contests"
  className="block rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
>
                <h4 className="text-lg font-semibold">
                  Contest Management
                </h4>
                <p className="mt-2 text-sm text-slate-600">
                  Create, update, publish, and manage contests.
                </p>
                </Link>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h4 className="text-lg font-semibold">

                    <Link
  href="/admin/quizzes"
  className="rounded-lg border p-4 hover:bg-gray-50"
>
                  Quiz Management
                  </Link>
                </h4>
                <p className="mt-2 text-sm text-slate-600">
                  Manage contest questions and options.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h4 className="text-lg font-semibold">
                  Registrations
                </h4>
                <p className="mt-2 text-sm text-slate-600">
                  View participants registered for contests.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h4 className="text-lg font-semibold">
                  Quiz Submissions
                </h4>
                <p className="mt-2 text-sm text-slate-600">
                 Review participants&apos; quiz submissions and scores.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <section>
            <h3 className="mb-5 text-2xl font-bold text-slate-900">
              Participant Dashboard
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h4 className="text-lg font-semibold">
                  Available Contests
                </h4>
                <p className="mt-2 text-sm text-slate-600">
                  Explore published programming contests and participate.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h4 className="text-lg font-semibold">
                  My Registrations
                </h4>
                <p className="mt-2 text-sm text-slate-600">
                  View the contests you have registered for.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h4 className="text-lg font-semibold">
                  My Submissions
                </h4>
                <p className="mt-2 text-sm text-slate-600">
                  View your quiz submissions and scores.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h4 className="text-lg font-semibold">
                  My Profile
                </h4>
                <p className="mt-2 text-sm text-slate-600">
                  View your account information.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
