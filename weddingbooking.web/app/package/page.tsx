"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
    Check,
    ChevronLeft,
    ChevronRight,
    Gift,
    Heart,
    Phone,
    Users,
} from "lucide-react"
import BookingProgress from "@/components/booking-progress"
import { packageSections, weddingPackages } from "@/components/package-data"
import { useBookingStore } from "@/store/bookingStore"

export default function PackagePage() {
    const booking = useBookingStore((state) => state.booking)
    const updateBooking = useBookingStore((state) => state.updateBooking)
    const router = useRouter()
    const [selectedPackage, setSelectedPackage] = useState(booking.typeofpackage)
    const [message, setMessage] = useState("")

    function choosePackage(packageId: string) {
        setSelectedPackage(packageId)
        setMessage("")
    }

    function next() {
        if (!selectedPackage) {
            setMessage("Please choose a package to continue.")
            return
        }

        updateBooking({ typeofpackage: selectedPackage })
        router.push("/customerdetail")
    }

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fffaf0,_transparent_32%),linear-gradient(180deg,_#faf8f3_0%,_#f4efe6_100%)] px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-6xl">
                <BookingProgress currentStep={3} />

                <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_18px_55px_rgba(72,55,31,0.09)] sm:p-8">
                    <header className="text-center">
                        <h1 className="font-serif text-3xl font-semibold text-emerald-950 sm:text-4xl">
                            Choose Your Package
                        </h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Select the package that best fits your event.
                        </p>
                    </header>

                    <div className="mt-5 flex items-center justify-center gap-3 rounded-xl border border-amber-300 bg-amber-50/60 px-4 py-3 text-center text-sm text-stone-700">
                        <Phone className="h-5 w-5 shrink-0 text-amber-700" />
                        <p>
                            Don&apos;t know what to choose? Contact us at
                            <span className="ml-1 font-semibold text-amber-900">+60 11-1234 5678</span>
                        </p>
                    </div>

                    <div className="mt-3 flex flex-col items-center justify-center gap-2 rounded-xl bg-[#faf8f3] px-4 py-3 text-center text-xs text-stone-600 sm:flex-row sm:gap-8 sm:text-sm">
                        <span className="inline-flex items-center gap-2">
                            <Gift className="h-5 w-5 text-amber-700" />
                            Both packages include complete venue and event essentials.
                        </span>
                        <span className="hidden h-5 w-px bg-stone-300 sm:block" />
                        <span className="inline-flex items-center gap-2">
                            <Heart className="h-5 w-5 text-amber-700" />
                            Same experience, with a different guest capacity.
                        </span>
                    </div>

                    <div className="mt-5 grid gap-5 lg:grid-cols-2">
                        {weddingPackages.map((weddingPackage) => {
                            const selected = selectedPackage === weddingPackage.id
                            const green = weddingPackage.color === "green"

                            return (
                                <article
                                    key={weddingPackage.id}
                                    className={`overflow-hidden rounded-2xl border bg-white transition ${
                                        selected
                                            ? "border-emerald-800 shadow-lg ring-2 ring-emerald-800/20"
                                            : "border-stone-200 shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                                    }`}
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={weddingPackage.image}
                                            alt={`${weddingPackage.name} ${weddingPackage.pax}`}
                                            fill
                                            sizes="(min-width: 1024px) 50vw, 100vw"
                                            className="object-cover"
                                        />
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-r ${
                                                green
                                                    ? "from-emerald-950/85 via-emerald-950/45 to-transparent"
                                                    : "from-rose-950/85 via-rose-950/45 to-transparent"
                                            }`}
                                        />
                                        <span
                                            className={`absolute right-4 top-4 rounded-full px-4 py-1.5 text-xs font-semibold text-white ${
                                                green ? "bg-emerald-800" : "bg-rose-800"
                                            }`}
                                        >
                                            {weddingPackage.badge}
                                        </span>
                                        <div className="absolute bottom-5 left-5 text-white">
                                            <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                                                Majlis Kahwin Malam
                                            </p>
                                            <h2 className="mt-1 font-serif text-3xl font-semibold italic text-amber-200">
                                                {weddingPackage.name}
                                            </h2>
                                            <p className="mt-1 text-sm">{weddingPackage.description}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between bg-[#faf8f3] px-5 py-3">
                                        <p
                                            className={`font-serif text-3xl font-semibold ${
                                                green ? "text-emerald-900" : "text-rose-900"
                                            }`}
                                        >
                                            {weddingPackage.price}
                                        </p>
                                        <p className="inline-flex items-center gap-2 text-lg font-semibold text-slate-950">
                                            <Users className="h-6 w-6" />
                                            {weddingPackage.pax}
                                        </p>
                                    </div>

                                    <div className="grid gap-x-6 gap-y-5 p-5 sm:grid-cols-2">
                                        {packageSections.map((section) => {
                                            const Icon = section.icon

                                            return (
                                                <div key={section.title}>
                                                    <div className="flex items-center gap-2">
                                                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                                                            <Icon className="h-5 w-5" />
                                                        </span>
                                                        <h3 className="font-serif text-base font-semibold text-slate-950">
                                                            {section.title}
                                                        </h3>
                                                    </div>
                                                    <ul className="ml-11 mt-2 space-y-1 text-xs text-slate-600">
                                                        {section.items.map((item) => (
                                                            <li key={item} className="flex gap-2">
                                                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-800" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className="px-5 pb-5">
                                        <button
                                            type="button"
                                            onClick={() => choosePackage(weddingPackage.id)}
                                            aria-pressed={selected}
                                            className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg font-medium text-white transition ${
                                                selected
                                                    ? "bg-emerald-700 ring-2 ring-emerald-700 ring-offset-2"
                                                    : green
                                                      ? "bg-emerald-900 hover:bg-emerald-800"
                                                      : "bg-rose-900 hover:bg-rose-800"
                                            }`}
                                        >
                                            {selected ? "Package Selected" : "Choose Package"}
                                            {selected ? (
                                                <Check className="h-4 w-4" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </article>
                            )
                        })}
                    </div>

                    {message && (
                        <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                            {message}
                        </p>
                    )}

                    <div className="mt-7 flex items-center justify-between gap-4 border-t border-stone-200 pt-6">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-6 font-medium text-emerald-950 transition hover:bg-stone-50"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Back
                        </button>

                        <button
                            type="button"
                            onClick={next}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-900 px-8 font-medium text-white shadow-sm transition hover:bg-emerald-800"
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </section>
            </div>
        </main>
    )
}
