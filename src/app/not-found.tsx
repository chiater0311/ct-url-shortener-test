import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          404
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Short URL not found
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          This shortened link does not exist or may no longer be available.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Create a short URL
        </Link>
      </section>
    </main>
  );
}
