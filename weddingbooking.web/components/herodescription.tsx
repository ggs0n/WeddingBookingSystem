import {
  Building2,
  HeartHandshake,
  PackageCheck,
  UsersRound,
} from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Elegant Venues",
    description: "Spacious & beautifully designed halls",
  },
  {
    icon: PackageCheck,
    title: "Complete Packages",
    description: "All-in-one wedding packages",
  },
  {
    icon: UsersRound,
    title: "Professional Team",
    description: "Experienced & dedicated event team",
  },
  {
    icon: HeartHandshake,
    title: "Memorable Moments",
    description: "We make your dreams come true",
  },
];

export default function HeroDesc() {
  return (
    <section id="packages" className="border-b border-stone-200 bg-white py-10 sm:py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-5 gap-y-10 px-6 md:grid-cols-4 lg:px-12">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <Icon className="mb-4 h-8 w-8 stroke-[1.5] text-amber-600" />
            <h2 className="text-sm font-semibold text-stone-900">{title}</h2>
            <p className="mt-2 max-w-40 text-xs leading-5 text-stone-500">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
