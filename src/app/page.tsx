import { UrlShortenerDashboard } from "@/components/url-shortener-dashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50 px-4 py-16">
      <div className="mb-10 max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
          URL Shortener
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Shorten long links in seconds
        </h1>

        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          Enter a normal web address and receive a shorter link that redirects
          directly to the original destination.
        </p>
      </div>

      <UrlShortenerDashboard />

      <p className="mt-8 text-center text-sm text-slate-500">
        Recent history is stored only in this browser.
      </p>
    </main>
  );
}
