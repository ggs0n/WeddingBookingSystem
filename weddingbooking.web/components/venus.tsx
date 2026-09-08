import Image from "next/image";
import Link from "next/link";

const venues = [
  {
    name: "Zuljannah Palace",
    description: "A grand and elegant ballroom perfect for your dream wedding.",
    image: "/zuljannahmain.jpg",
  },
  {
    name: "The Glass Tree",
    description: "A modern glass-themed venue surrounded by nature.",
    image: "/glasshouse.jpg",
  },
  {
    name: "Istana Kaca",
    description: "A royal setting with a touch of traditional elegance.",
    image: "/glasshouse2.jpg",
  },
];

export default function Venus() {
  return (
    <section id="venues" className="bg-stone-50 px-6 py-14 sm:py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-amber-600">
            DISCOVER
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-stone-950">
            Our Venues<span className="text-amber-500">.</span>
          </h2>
          <p className="mt-3 text-sm text-stone-500">
            Multiple stunning venues to make your special day unforgettable.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {venues.map((venue) => (
            <article
              key={venue.name}
              className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <Image
                src={venue.image}
                alt={venue.name}
                width={640}
                height={420}
                className="h-56 w-full object-cover"
              />

              <div className="p-6 text-left">
                <h3 className="text-lg font-semibold text-stone-900">{venue.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-stone-500">
                  {venue.description}
                </p>
                <Link
                  href="/bookvenue"
                  className="mt-5 inline-flex rounded border border-emerald-900 px-4 py-2 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-900 hover:text-white"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
