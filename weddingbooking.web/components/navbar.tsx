import Image from "next/image";
import Link from "next/link";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/aboutus" },
  { label: "Venues", href: "/#venues" },
  { label: "Packages", href: "/#packages" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  return (
    <header className="relative z-50 border-b border-stone-100 bg-white">
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3" aria-label="Zuljannah Palace home">
          <Image
            src="/logozp.png"
            alt="Zuljannah Palace logo"
            width={52}
            height={52}
            className="h-12 w-12 object-contain"
            priority
          />

          <div className="text-center font-serif leading-none text-stone-900">
            <p className="text-lg tracking-[0.12em]">ZULJANNAH</p>
            <p className="mt-1 text-xs tracking-[0.38em]">PALACE</p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 text-sm text-stone-700 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-amber-600"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/bookvenue"
          className="rounded-md bg-amber-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-amber-700 sm:px-5"
        >
          Check Availability
        </Link>

          <Link
          href="/login"
          className="rounded-md bg-amber-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-amber-700 sm:px-5"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
