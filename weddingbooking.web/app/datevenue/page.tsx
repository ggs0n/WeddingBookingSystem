"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DayPicker } from "@daypicker/react"
import {
    CalendarCheck2,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Info,
    MoonStar,
    Sun,
} from "lucide-react"
import BookingProgress from "@/components/booking-progress"
import { useBookingStore } from "@/store/bookingStore"
import "@daypicker/react/style.css"
import styles from "./datevenue.module.css"

type BookedSlot = {
    date: string
    session: string
}

const venueDetails: Record<string, { name: string; image: string }> = {
    zuljannah: { name: "Zuljannah Palace", image: "/zuljannahmain.jpg" },
    glasstree: { name: "The Glass Tree", image: "/glasshouse.jpg" },
    istanakaca: { name: "Istana Kaca", image: "/glasshouse2.jpg" },
}

function formatDate(date: Date) {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
    ].join("-")
}

function formatDateLabel(date: Date) {
    return new Intl.DateTimeFormat("en-MY", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date)
}

export default function DateVenue() {
    const booking = useBookingStore((state) => state.booking)
    const updateBooking = useBookingStore((state) => state.updateBooking)
    const router = useRouter()

    const [selectedDate, setSelectedDate] = useState<Date>()
    const [selectedSession, setSelectedSession] = useState("")
    const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([])
    const [fullyBookedDates, setFullyBookedDates] = useState<Date[]>([])
    const [morningBooked, setMorningBooked] = useState(false)
    const [eveningBooked, setEveningBooked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    const venue = venueDetails[booking.venue] ?? {
        name: booking.venue || "Selected venue",
        image: "/zuljannahmain.jpg",
    }

    useEffect(() => {
        if (!booking.venue) return

        async function loadAvailability() {
            setIsLoading(true)
            setMessage("")

            try {
                const response = await fetch("/api/booking/checkavailable", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        venue: booking.venue,
                    }),
                })

                if (!response.ok) {
                    throw new Error("Unable to load availability")
                }

                const data = await response.json()

                setBookedSlots(data.bookedSlots ?? [])
                setFullyBookedDates(
                    (data.fullyBookedDates ?? []).map(
                        (date: string) => new Date(`${date}T00:00:00`),
                    ),
                )
            } catch {
                setMessage("Unable to load availability. Please try again.")
            } finally {
                setIsLoading(false)
            }
        }

        loadAvailability()
    }, [booking.venue])

    function selectDate(date: Date | undefined) {
        setSelectedSession("")
        setMessage("")

        if (!date) {
            setSelectedDate(undefined)
            setMorningBooked(false)
            setEveningBooked(false)
            return
        }

        const dateValue = formatDate(date)
        const isMorningBooked = bookedSlots.some(
            (slot) => slot.date === dateValue && slot.session === "Morning",
        )
        const isEveningBooked = bookedSlots.some(
            (slot) => slot.date === dateValue && slot.session === "Evening",
        )

        setMorningBooked(isMorningBooked)
        setEveningBooked(isEveningBooked)

        if (isMorningBooked && isEveningBooked) {
            setSelectedDate(undefined)
            setMessage("This date is fully booked. Please select another date.")
            return
        }

        setSelectedDate(date)
    }

    function selectSession(session: string) {
        setSelectedSession(session)
        setMessage("")
    }

    function Back() {
        router.back()
    }

    function Next() {
        if (!selectedDate) {
            setMessage("Please select an available date.")
            return
        }

        if (!selectedSession) {
            setMessage("Please select an available session.")
            return
        }

        updateBooking({
            date: formatDate(selectedDate),
            session: selectedSession,
        })

        router.push("/package")
    }

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fffaf0,_transparent_32%),linear-gradient(180deg,_#faf8f3_0%,_#f4efe6_100%)] px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-5xl">
                <BookingProgress currentStep={2} />

                <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_18px_55px_rgba(72,55,31,0.09)] sm:p-8">
                    <header>
                        <h1 className="font-serif text-3xl font-semibold text-slate-950 sm:text-4xl">
                            Choose Date &amp; Session
                        </h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Pick an available date and the session that suits your celebration.
                        </p>
                    </header>

                    <div className="mt-5 flex flex-col justify-between gap-4 rounded-xl bg-[#faf8f3] p-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-4">
                            <Image
                                src={venue.image}
                                alt={venue.name}
                                width={112}
                                height={80}
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
                            Change venue
                        </button>
                    </div>

                    <div className="mt-7 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
                        <div>
                            <SectionTitle number="1" title="Select Date" />

                            <div className="rounded-xl border border-stone-200 bg-white p-3 shadow-sm sm:p-5">
                                <div className={`${styles.calendar} flex justify-center`}>
                                    <DayPicker
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={selectDate}
                                        disabled={[
                                            { before: new Date() },
                                            ...fullyBookedDates,
                                        ]}
                                    />
                                </div>

                                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-stone-100 pt-4 text-xs text-stone-600">
                                    <Legend color="bg-white border border-stone-300" label="Available" />
                                    <Legend color="bg-emerald-900" label="Selected" />
                                    <Legend color="bg-stone-200" label="Fully booked" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <SectionTitle number="2" title="Select Session" />

                            <div className="space-y-4">
                                <SessionButton
                                    title="Morning Session"
                                    time="9:00 AM – 4:00 PM"
                                    icon={<Sun className="h-6 w-6" />}
                                    selected={selectedSession === "Morning"}
                                    disabled={!selectedDate || morningBooked}
                                    booked={morningBooked}
                                    onClick={() => selectSession("Morning")}
                                />

                                <SessionButton
                                    title="Evening Session"
                                    time="6:00 PM – 11:00 PM"
                                    icon={<MoonStar className="h-6 w-6" />}
                                    selected={selectedSession === "Evening"}
                                    disabled={!selectedDate || eveningBooked}
                                    booked={eveningBooked}
                                    onClick={() => selectSession("Evening")}
                                />
                            </div>

                            {!selectedDate && (
                                <div className="mt-4 flex gap-3 rounded-lg bg-amber-50 p-4 text-sm text-amber-950">
                                    <Info className="mt-0.5 h-5 w-5 shrink-0" />
                                    Select a date to see which sessions are available.
                                </div>
                            )}

                            {selectedDate && (
                                <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                                    <div className="flex gap-3">
                                        <CalendarCheck2 className="h-6 w-6 shrink-0 text-emerald-900" />
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-[0.12em] text-emerald-800">
                                                Your selection
                                            </p>
                                            <p className="mt-1 font-semibold text-emerald-950">
                                                {formatDateLabel(selectedDate)}
                                            </p>
                                            <p className="mt-1 text-sm text-emerald-900/75">
                                                {selectedSession
                                                    ? `${selectedSession} Session`
                                                    : "Choose a session to continue"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {isLoading && (
                        <p className="mt-5 text-sm text-stone-500">Loading availability…</p>
                    )}

                    {message && (
                        <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                            {message}
                        </p>
                    )}

                    <div className="mt-7 flex items-center justify-between gap-4 border-t border-stone-200 pt-6">
                        <button
                            type="button"
                            onClick={Back}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-6 font-medium text-emerald-950 transition hover:bg-stone-50"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Back
                        </button>

                        <button
                            type="button"
                            onClick={Next}
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

function SectionTitle({ number, title }: { number: string; title: string }) {
    return (
        <div className="mb-4 flex items-center gap-4">
            <h2 className="shrink-0 font-serif text-xl font-semibold text-slate-950">
                {number}. {title}
            </h2>
            <span className="h-px w-full bg-amber-500/70" />
        </div>
    )
}

function Legend({ color, label }: { color: string; label: string }) {
    return (
        <span className="inline-flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${color}`} />
            {label}
        </span>
    )
}

function SessionButton({
    title,
    time,
    icon,
    selected,
    disabled,
    booked,
    onClick,
}: {
    title: string
    time: string
    icon: React.ReactNode
    selected: boolean
    disabled: boolean
    booked: boolean
    onClick: () => void
}) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            aria-pressed={selected}
            className={`flex w-full items-center gap-4 rounded-xl border p-5 text-left transition ${
                selected
                    ? "border-emerald-800 bg-emerald-50 shadow-sm ring-1 ring-emerald-800"
                    : disabled
                      ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400"
                      : "border-stone-200 bg-white hover:border-amber-500 hover:bg-amber-50/40"
            }`}
        >
            <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                    selected
                        ? "bg-emerald-900 text-white"
                        : disabled
                          ? "bg-stone-200 text-stone-400"
                          : "bg-amber-50 text-amber-700"
                }`}
            >
                {icon}
            </span>
            <span className="min-w-0 flex-1">
                <span className="block font-serif text-lg font-semibold">{title}</span>
                <span className="mt-1 flex items-center gap-1.5 text-sm opacity-75">
                    <Clock3 className="h-4 w-4" />
                    {time}
                </span>
            </span>
            <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    booked
                        ? "bg-stone-200 text-stone-500"
                        : disabled
                          ? "bg-stone-200 text-stone-500"
                        : "bg-emerald-100 text-emerald-800"
                }`}
            >
                {booked ? "Booked" : disabled ? "Select date" : "Available"}
            </span>
        </button>
    )
}
