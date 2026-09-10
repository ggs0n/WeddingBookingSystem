"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import BookingProgress from "@/components/booking-progress"
import { useBookingStore } from "@/store/bookingStore"

export default function BookVenue()

{
    const [selected, setSelected] = useState("");
    const router = useRouter()
    const updateBooking = useBookingStore((state) => state.updateBooking);

    function next() {
    if (selected) {
        
        updateBooking({
        venue: selected,
        });
        router.push(`/datevenue?venue=${selected}`);
        }
    }

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fffaf0,_transparent_32%),linear-gradient(180deg,_#faf8f3_0%,_#f4efe6_100%)] px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-5xl">
            <BookingProgress currentStep={1} />
            <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_18px_55px_rgba(72,55,31,0.09)] sm:p-8">
            <h1 className="text-4xl mb-2">Choose Your Venue</h1>
            <h1 className="mb-6">Select the venue you would like to book</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div onClick={() => setSelected("zuljannah")} className={`cursor-pointer rounded border border-2 p-4 
                ${ selected == "zuljannah" ? "border-green-700 border-4" : "border-gray-300" }`}>
                    <Image src="/zuljannahmain.jpg" alt="Zuljannah Palace" width={500} height={320} className="mb-4 h-80 w-full object-cover p-3" />
                    <h1>Zuljannah Palace</h1>
                    <p>Ballroom</p>
                    <p>800-1000 pax</p>
                </div>

                <div onClick={() => setSelected("glasstree")} className={`cursor-pointer rounded border border-2 p-4 
                ${ selected == "glasstree"? "border-green-700 border-4" : "border-gray-300" }`}>
                    <Image src="/glasshouse.jpg" alt="The Glass Tree" width={500} height={320} className="mb-4 h-80 w-full object-cover p-3" />
                    <h1>The Glass Tree</h1>
                    <p>Ballroom</p>
                    <p>800-1000 pax</p>

                </div>

                <div onClick={() => setSelected("istanakaca")} className={`cursor-pointer rounded border border-2 p-4 
                ${ selected == "istanakaca"? "border-green-700 border-4" : "border-gray-300" }`}>
                    <Image src="/glasshouse2.jpg" alt="Istana Kaca" width={500} height={320} className="mb-4 h-80 w-full object-cover p-3" />
                    <h1>Istana Kaca</h1>
                    <p>Ballroom</p>
                    <p>800-1000 pax</p>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button className="bg-emerald-700 py-4 px-6 cursor-pointer text-white" onClick={next}>Next {'>'}</button>
            </div>

            </section>
            </div>
        </main>
    )
}