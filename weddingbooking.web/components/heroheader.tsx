import { Play } from "lucide-react";
import Link from "next/link";

export default function HeroHeader() {
  return (
    <section
      className="relative min-h-[520px] overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/kahwinheader.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/5" />

      <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-semibold tracking-wide text-amber-600 sm:text-sm">
            CREATE YOUR PERFECT MOMENTS
          </p>

          <h1 className="font-serif text-4xl leading-[1.08] font-semibold text-stone-950 sm:text-5xl lg:text-6xl">
            A Timeless Venue
            <br />
            For Your Perfect Day
          </h1>

          <p className="mt-6 max-w-md text-sm leading-6 text-stone-600 sm:text-base">
            Zuljannah Palace offers an elegant and spacious setting for weddings,
            receptions and private events.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/bookvenue"
              className="rounded-md bg-emerald-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-800"
            >
              Check Availability
            </Link>

            <button
              type="button"
              className="group flex items-center gap-3 text-sm font-medium text-stone-800"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-700 transition-colors group-hover:border-amber-600 group-hover:text-amber-600">
                <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
              </span>
              Watch Venue Tour
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
