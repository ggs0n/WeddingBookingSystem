"use client"

import { useBookingStore } from "@/store/bookingStore"

export default function Summary ()
{
    const bookingstore = useBookingStore((state)=> state.booking);

    async function addBooking() {
        const response = await fetch("/api/booking/createbooking", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(bookingstore),
        })

        if(response.ok)
        {
            alert("Booking created")
        }
        else alert("Booking failed")
    }



    return (
            <div className="bg-yellow-50 min-h-500">
                <div className="py-4 px-5 mt-5 mx-auto max-w-300 border border-2 rounded-md border-gray-200 bg-white">
                    <div className="mb-3">
                        <h1 className="text-xl font-bold">Review Your Booking</h1>
                        <p>Please review all information</p>
                    </div>

                    <div className="mb-3">
                        <div className="flex items-center gap-3">
                            <h1 className="shrink-0 text-xl font-bold">Venue & Session Summary</h1>
                            <div className="h-px flex-1 bg-orange-400" aria-hidden="true" />
                        </div>
                        <h1>{bookingstore.venue}</h1>
                        <h1>{bookingstore.date}</h1>
                        <h1>{bookingstore.session}</h1>
                    </div>

                    <div className="mb-3">
                        <div className="flex items-center gap-3">
                        <h1 className="shrink-0 text-xl font-bold">Contact Person</h1>
                        <div className="h-px flex-1 bg-orange-400" aria-hidden="true" />
                        </div>
                        <h1>{bookingstore.customerEmail}</h1>
                        <h1>{bookingstore.customerName}</h1>
                        <h1>{bookingstore.customerPhone}</h1>
                    </div>

                    <div className="mb-3">
                        <h1 className="text-xl font-bold">Event Details</h1>
                        <div className="h-px flex-1 bg-orange-400" aria-hidden="true" />
                        <h1>{bookingstore.brideName}</h1>
                        <h1>{bookingstore.groomName}</h1>
                        <h1>{bookingstore.guestCount}</h1>
                        <h1>{bookingstore.typeOfEvent}</h1>
                    </div>

                    <div className="mb-3">
                        <h1 className="text-xl font-bold">Budget Summary</h1>
                        <div className="h-px flex-1 bg-orange-400" aria-hidden="true" />
                        <h1>RM15000</h1>
                    </div>

                    <div className="flex justify-between">
                        <button className="bg-orange-400 text-white p-4">Back</button>
                        <button className="bg-orange-400 text-white p-4" onClick={addBooking}>Submit Booking</button>
                    </div>
                </div>
            </div>
    )
}
