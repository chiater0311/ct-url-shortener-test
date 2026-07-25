"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="w-full max-w-lg rounded-2xl border border-red-200 bg-white p-8 text-center shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
          Something went wrong
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Unable to complete your request
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          An unexpected problem occurred. Please try again.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
