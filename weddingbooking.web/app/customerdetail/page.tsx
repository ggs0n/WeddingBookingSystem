"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"
import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Clock3,
    ShieldCheck,
    Users,
} from "lucide-react"
import { z } from "zod"
import BookingProgress from "@/components/booking-progress"
import { useBookingStore } from "@/store/bookingStore"

const customerSchema = z
    .object({
        fullName: z.string().trim().min(1, "Full name is required"),
        phoneNo: z.string().trim().min(9, "Invalid phone number"),
        emailAddress: z.string().trim().max(50).email("Invalid email address"),
        typeOfEvent: z.enum(["Wedding", "Aqiqah", "Nikah"]),
        brideName: z.string().trim().min(1, "Bride's name is required").max(50),
        groomName: z.string().trim().min(1, "Groom's name is required").max(50),
        guestCount: z.coerce
            .number()
            .int("Guest count must be a whole number")
            .positive("Guest count must be more than 0"),
        confirmation: z.string().optional(),
    })
    .refine((data) => data.confirmation === "on", {
        path: ["confirmation"],
        message: "Please confirm that the details are correct",
    })

const venueDetails: Record<string, { name: string; image: string }> = {
    zuljannah: { name: "Zuljannah Palace", image: "/zuljannahmain.jpg" },
    glasstree: { name: "The Glass Tree", image: "/glasshouse.jpg" },
    istanakaca: { name: "Istana Kaca", image: "/glasshouse2.jpg" },
}

const inputClass =
    "mt-2 h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"

function formatBookingDate(date: string) {
    if (!date) return "Not selected"

    const [year, month, day] = date.split("-").map(Number)
    const parsedDate = new Date(year, month - 1, day)

    if (Number.isNaN(parsedDate.getTime())) return date

    return new Intl.DateTimeFormat("en-MY", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(parsedDate)
}

export default function CustomerDetail() {
    const booking = useBookingStore((state) => state.booking)
    const updateBooking = useBookingStore((state) => state.updateBooking)
    const router = useRouter()
    const [errors, setErrors] = useState<Record<string, string>>({})

    const venue = venueDetails[booking.venue] ?? {
        name: booking.venue || "Selected venue",
        image: "/zuljannahmain.jpg",
    }

    function Back() {
        router.back()
    }

    function Next(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const result = customerSchema.safeParse(Object.fromEntries(formData))

        if (!result.success) {
            const validationErrors: Record<string, string> = {}

            result.error.issues.forEach((issue) => {
                const fieldName = String(issue.path[0])
                validationErrors[fieldName] = issue.message
            })

            setErrors(validationErrors)
            return
        }

        setErrors({})
        updateBooking({
            customerName: result.data.fullName,
            customerPhone: result.data.phoneNo,
            customerEmail: result.data.emailAddress,
            typeOfEvent: result.data.typeOfEvent,
            brideName: result.data.brideName,
            groomName: result.data.groomName,
            guestCount: result.data.guestCount,
        })

        router.push("/summary")
    }

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fffaf0,_transparent_32%),linear-gradient(180deg,_#faf8f3_0%,_#f4efe6_100%)] px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-5xl">
                <BookingProgress currentStep={4} />

                <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_18px_55px_rgba(72,55,31,0.09)] sm:p-8">
                    <header>
                        <h1 className="font-serif text-3xl font-semibold text-slate-950 sm:text-4xl">
                            Your Details
                        </h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Please provide your information to continue.
                        </p>
                    </header>

                    <div className="mt-5 grid overflow-hidden rounded-xl bg-[#faf8f3] md:grid-cols-[1.3fr_1fr_1fr_0.9fr]">
                        <div className="flex items-center gap-4 border-b border-stone-200 p-4 md:border-b-0 md:border-r">
                            <Image
                                src={venue.image}
                                alt={venue.name}
                                width={120}
                                height={84}
                                className="h-20 w-28 rounded-lg object-cover"
                            />
                            <div>
                                <p className="font-serif text-lg font-semibold text-slate-950">
                                    {venue.name}
                                </p>
                                <p className="text-sm text-slate-500">Ballroom</p>
                            </div>
                        </div>

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
                            value={booking.guestCount ? `${booking.guestCount} Pax` : "Set below"}
                            last
                        />
                    </div>

                    <form onSubmit={Next} noValidate className="mt-6">
                        <SectionTitle number="1" title="Contact Person" />

                        <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
                            <FormField label="Full Name" error={errors.fullName}>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    autoComplete="name"
                                    defaultValue={booking.customerName}
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="Email Address" error={errors.emailAddress}>
                                <input
                                    type="email"
                                    name="emailAddress"
                                    placeholder="Enter your email address"
                                    autoComplete="email"
                                    defaultValue={booking.customerEmail}
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="Phone Number" error={errors.phoneNo}>
                                <input
                                    type="tel"
                                    name="phoneNo"
                                    inputMode="numeric"
                                    placeholder="012-345 6789"
                                    autoComplete="tel"
                                    defaultValue={booking.customerPhone}
                                    onInput={(event) => {
                                        event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "")
                                    }}
                                    className={inputClass}
                                />
                            </FormField>
                        </div>

                        <SectionTitle number="2" title="Event Details" />

                        <div className="grid gap-x-6 gap-y-4 md:grid-cols-2">
                            <FormField label="Type of Event" error={errors.typeOfEvent}>
                                <select
                                    name="typeOfEvent"
                                    defaultValue={booking.typeOfEvent || ""}
                                    className={inputClass}
                                >
                                    <option value="" disabled>
                                        Select event type
                                    </option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Aqiqah">Aqiqah</option>
                                    <option value="Nikah">Nikah</option>
                                </select>
                            </FormField>

                            <FormField label="Estimated Number of Guests" error={errors.guestCount}>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="guestCount"
                                        min="1"
                                        inputMode="numeric"
                                        placeholder="Enter estimated number of guests"
                                        defaultValue={booking.guestCount || ""}
                                        className={`${inputClass} pr-12`}
                                    />
                                    <span className="pointer-events-none absolute right-3 top-[22px] text-sm text-stone-400">
                                        Pax
                                    </span>
                                </div>
                            </FormField>

                            <FormField label="Bride's Name" error={errors.brideName}>
                                <input
                                    type="text"
                                    name="brideName"
                                    placeholder="Enter bride's full name"
                                    defaultValue={booking.brideName}
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="Groom's Name" error={errors.groomName}>
                                <input
                                    type="text"
                                    name="groomName"
                                    placeholder="Enter groom's full name"
                                    defaultValue={booking.groomName}
                                    className={inputClass}
                                />
                            </FormField>
                        </div>

                        <label className="mt-7 flex items-start gap-3 text-sm text-slate-700">
                            <input
                                type="checkbox"
                                name="confirmation"
                                className="mt-0.5 h-4 w-4 rounded border-stone-300 accent-emerald-900"
                            />
                            <span>
                                I confirm the details provided are correct.
                                <span className="ml-1 text-red-600">*</span>
                            </span>
                        </label>
                        {errors.confirmation && (
                            <p className="ml-7 mt-1 text-xs text-red-600">
                                {errors.confirmation}
                            </p>
                        )}

                        <div className="mt-5 flex items-center justify-between gap-4">
                            <button
                                type="button"
                                onClick={Back}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-6 font-medium text-emerald-950 transition hover:bg-stone-50"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Back
                            </button>

                            <button
                                type="submit"
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-900 px-8 font-medium text-white shadow-sm transition hover:bg-emerald-800"
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="mt-5 flex items-start gap-3 rounded-lg bg-emerald-50 px-4 py-3 text-emerald-950">
                            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0" />
                            <div>
                                <p className="font-semibold">Secure &amp; Private</p>
                                <p className="text-sm text-emerald-950/75">
                                    Your information is only used to manage your booking. We keep your data safe and confidential.
                                </p>
                            </div>
                        </div>
                    </form>
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
            className={`flex items-center gap-3 border-b border-stone-200 p-4 md:border-b-0 ${
                last ? "" : "md:border-r"
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

function SectionTitle({ number, title }: { number: string; title: string }) {
    return (
        <div className="mb-4 mt-7 flex items-center gap-4">
            <h2 className="shrink-0 font-serif text-xl font-semibold text-slate-950">
                {number}. {title}
            </h2>
            <span className="h-px w-full bg-amber-500/70" />
        </div>
    )
}

function FormField({
    label,
    error,
    children,
}: {
    label: string
    error?: string
    children: React.ReactNode
}) {
    return (
        <label className="block text-sm font-medium text-slate-900">
            {label} <span className="text-red-600">*</span>
            {children}
            {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
        </label>
    )
}
