"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
    CalendarDays,
    CheckCircle2,
    ChevronLeft,
    Clock3,
    Mail,
    Phone,
    Send,
    ShieldCheck,
    Users,
} from "lucide-react"
import BookingProgress from "@/components/booking-progress"
import { getWeddingPackage } from "@/components/package-data"
import { useBookingStore } from "@/store/bookingStore"

const venueDetails: Record<string, { name: string; image: string }> = {
    zuljannah: { name: "Zuljannah Palace", image: "/zuljannahmain.jpg" },
    glasstree: { name: "The Glass Tree", image: "/glasshouse.jpg" },
    istanakaca: { name: "Istana Kaca", image: "/glasshouse2.jpg" },
}

function formatBookingDate(date: string) {
    if (!date) return "Not selected"

    const [year, month, day] = date.split("-").map(Number)
    const parsedDate = new Date(year, month - 1, day)

    if (Number.isNaN(parsedDate.getTime())) return date

    return new Intl.DateTimeFormat("en-MY", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(parsedDate)
}

export default function Summary() {
    const booking = useBookingStore((state) => state.booking)
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [message, setMessage] = useState("")

    const venue = venueDetails[booking.venue] ?? {
        name: booking.venue || "Selected venue",
        image: "/zuljannahmain.jpg",
    }
    const selectedPackage = getWeddingPackage(booking.typeofpackage) ?? {
        name: "Package not selected",
        price: "Not selected",
        pax: "",
        description: "Return to the package page to choose a package",
        image: "/kahwinheader.jpg",
    }

    async function addBooking() {
        setIsSubmitting(true)
        setMessage("")

        try {
            const response = await fetch("/api/booking/createbooking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(booking),
            })

            const result = await response.json().catch(() => ({}))

            if (!response.ok) {
                throw new Error(result.error ?? "Unable to create booking")
            }

            setSubmitted(true)
            setMessage(`Booking created successfully. Booking ID: ${result.bookingId}`)
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Unable to create booking")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fffaf0,_transparent_32%),linear-gradient(180deg,_#faf8f3_0%,_#f4efe6_100%)] px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-5xl">
                <BookingProgress currentStep={5} />

                <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_18px_55px_rgba(72,55,31,0.09)] sm:p-8">
                    <header>
                        <h1 className="font-serif text-3xl font-semibold text-slate-950 sm:text-4xl">
                            Review Your Booking
                        </h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Please check all information before submitting your booking.
                        </p>
                    </header>

                    <div className="mt-6 overflow-hidden rounded-xl bg-[#faf8f3]">
                        <div className="flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={venue.image}
                                    alt={venue.name}
                                    width={120}
                                    height={84}
                                    className="h-20 w-28 rounded-lg object-cover"
                                />
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber-700">
                                        Selected venue
                                    </p>
                                    <p className="mt-1 font-serif text-lg font-semibold text-slate-950">
                                        {venue.name}
                                    </p>
                                    <p className="text-sm text-slate-500">Ballroom</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => router.push("/bookvenue")}
                                className="self-start text-sm font-semibold text-emerald-900 underline decoration-amber-500 underline-offset-4 sm:self-center"
                            >
                                Edit venue
                            </button>
                        </div>

                        <div className="grid border-t border-stone-200 sm:grid-cols-3">
                            <SummaryItem
                                icon={<CalendarDays className="h-5 w-5" />}
                                label="Date"
                                value={formatBookingDate(booking.date)}
                            />
                            <SummaryItem
                                icon={<Clock3 className="h-5 w-5" />}
                                label="Session"
                                value={booking.session ? `${booking.session} Session` : "Not selected"}
                            />
                            <SummaryItem
                                icon={<Users className="h-5 w-5" />}
                                label="Estimated Pax"
                                value={booking.guestCount ? `${booking.guestCount} Pax` : "Not provided"}
                                last
                            />
                        </div>
                    </div>

                    <ReviewSection
                        number="1"
                        title="Contact Person"
                        onEdit={() => router.push("/customerdetail")}
                    >
                        <div className="grid gap-4 sm:grid-cols-3">
                            <DetailItem icon={<Users />} label="Full Name" value={booking.customerName} />
                            <DetailItem icon={<Mail />} label="Email Address" value={booking.customerEmail} />
                            <DetailItem icon={<Phone />} label="Phone Number" value={booking.customerPhone} />
                        </div>
                    </ReviewSection>

                    <ReviewSection
                        number="2"
                        title="Event Details"
                        onEdit={() => router.push("/customerdetail")}
                    >
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <DetailItem label="Type of Event" value={booking.typeOfEvent} />
                            <DetailItem label="Bride's Name" value={booking.brideName} />
                            <DetailItem label="Groom's Name" value={booking.groomName} />
                            <DetailItem label="Guest Count" value={`${booking.guestCount || 0} Pax`} />
                        </div>
                    </ReviewSection>

                    <ReviewSection
                        number="3"
                        title="Package Summary"
                        onEdit={() => router.push("/package")}
                    >
                        <div className="flex flex-col justify-between gap-5 rounded-xl border border-amber-100 bg-amber-50/60 p-5 sm:flex-row sm:items-center">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={selectedPackage.image}
                                    alt={selectedPackage.name}
                                    width={128}
                                    height={88}
                                    className="h-20 w-28 shrink-0 rounded-lg object-cover"
                                />
                                <div>
                                    <p className="font-serif text-lg font-semibold text-slate-950">
                                        {selectedPackage.name}
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        {[selectedPackage.pax, selectedPackage.description]
                                            .filter(Boolean)
                                            .join(" · ")}
                                    </p>
                                </div>
                            </div>
                            <div className="sm:text-right">
                                <p className="text-xs uppercase tracking-[0.14em] text-stone-500">
                                    Total amount
                                </p>
                                <p className="mt-1 font-serif text-2xl font-semibold text-emerald-950">
                                    {selectedPackage.price}
                                </p>
                            </div>
                        </div>
                    </ReviewSection>

                    {message && (
                        <div
                            className={`mt-6 flex items-start gap-3 rounded-lg px-4 py-3 text-sm ${
                                submitted
                                    ? "bg-emerald-50 text-emerald-950"
                                    : "bg-red-50 text-red-700"
                            }`}
                        >
                            {submitted && <CheckCircle2 className="h-5 w-5 shrink-0" />}
                            <p>{message}</p>
                        </div>
                    )}

                    <div className="mt-7 flex flex-col-reverse justify-between gap-4 border-t border-stone-200 pt-6 sm:flex-row sm:items-center">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            disabled={isSubmitting}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-6 font-medium text-emerald-950 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Back
                        </button>

                        <button
                            type="button"
                            onClick={addBooking}
                            disabled={isSubmitting || submitted}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-900 px-8 font-medium text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-900/60"
                        >
                            {submitted ? (
                                <>
                                    <CheckCircle2 className="h-4 w-4" />
                                    Booking Submitted
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    {isSubmitting ? "Submitting…" : "Submit Booking"}
                                </>
                            )}
                        </button>
                    </div>

                    <div className="mt-5 flex items-start gap-3 rounded-lg bg-emerald-50 px-4 py-3 text-emerald-950">
                        <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0" />
                        <div>
                            <p className="font-semibold">Secure booking</p>
                            <p className="text-sm text-emerald-950/75">
                                Your information is protected and will only be used to manage your booking.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

function SummaryItem({
    icon,
    label,
    value,
    last = false,
}: {
    icon: React.ReactNode
    label: string
    value: string
    last?: boolean
}) {
    return (
        <div
            className={`flex items-center gap-3 border-b border-stone-200 p-4 sm:border-b-0 ${
                last ? "" : "sm:border-r"
            }`}
        >
            <span className="text-slate-800">{icon}</span>
            <div>
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
            </div>
        </div>
    )
}

function ReviewSection({
    number,
    title,
    onEdit,
    children,
}: {
    number: string
    title: string
    onEdit?: () => void
    children: React.ReactNode
}) {
    return (
        <section className="mt-7">
            <div className="mb-4 flex items-center gap-4">
                <h2 className="shrink-0 font-serif text-xl font-semibold text-slate-950">
                    {number}. {title}
                </h2>
                <span className="h-px w-full bg-amber-500/70" />
                {onEdit && (
                    <button
                        type="button"
                        onClick={onEdit}
                        className="shrink-0 text-sm font-semibold text-emerald-900"
                    >
                        Edit
                    </button>
                )}
            </div>
            {children}
        </section>
    )
}

function DetailItem({
    icon,
    label,
    value,
}: {
    icon?: React.ReactNode
    label: string
    value: string
}) {
    return (
        <div className="rounded-lg border border-stone-200 bg-white p-4">
            <div className="flex items-center gap-2 text-xs text-stone-500">
                {icon && <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
                {label}
            </div>
            <p className="mt-2 break-words text-sm font-semibold text-slate-950">
                {value || "Not provided"}
            </p>
        </div>
    )
}
