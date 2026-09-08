"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";

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
        <div className="py-6 px-10">
            <h1 className="text-4xl mb-2">Choose Your Venue</h1>
            <h1 className="mb-6">Select the venue you would like to book</h1>

            <div className="grid grid-cols-3 gap-10">
                <div onClick={() => setSelected("zuljannah")} className={`cursor-pointer rounded border border-2 p-4 
                ${ selected == "zuljannah" ? "border-green-700 border-4" : "border-gray-300" }`}>
                    <img src="./zuljannahmain.jpg" className="h-80 mb-4 p-3"></img>
                    <h1>Zuljannah Palace</h1>
                    <p>Ballroom</p>
                    <p>800-1000 pax</p>
                </div>

                <div onClick={() => setSelected("glasstree")} className={`cursor-pointer rounded border border-2 p-4 
                ${ selected == "glasstree"? "border-green-700 border-4" : "border-gray-300" }`}>
                    <img src="./glasshouse.jpg" className="h-80 mb-4 p-3"></img>
                    <h1>The Glass Tree</h1>
                    <p>Ballroom</p>
                    <p>800-1000 pax</p>

                </div>

                <div onClick={() => setSelected("istanakaca")} className={`cursor-pointer rounded border border-2 p-4 
                ${ selected == "istanakaca"? "border-green-700 border-4" : "border-gray-300" }`}>
                    <img src="./glasshouse2.jpg" className="h-80 mb-4 p-3"></img>
                    <h1>Istana Kaca</h1>
                    <p>Ballroom</p>
                    <p>800-1000 pax</p>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button className="bg-emerald-700 py-4 px-6 cursor-pointer text-white" onClick={next}>Next {'>'}</button>
            </div>
        
        </div>
    )
}