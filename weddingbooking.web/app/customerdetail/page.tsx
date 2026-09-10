"use client"

import { useBookingStore } from "@/store/bookingStore"
import { SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod"

const customerSchema = z.object({
    fullName: z.string().trim().min(1, "Full name is required"),
    phoneNo: z.string().trim().min(9, "Invalid phone number"),
    emailAddress: z.string().trim().email("Invalid email address"),
    typeOfEvent: z.enum(["Wedding", "Aqiqah", "Nikah"]),
    brideName: z.string(),
    groomName: z.string(),
    guestCount: z.coerce.number().int().positive(
        "Guest count must be more than 0"
    ),
})

export default function CustomerDetail ()
{
    const booking = useBookingStore((state) => state.booking);
    const updateBooking = useBookingStore((state) => state.updateBooking);
    const router = useRouter()

    

    function Next (event : SubmitEvent<HTMLFormElement>)
    {   
        event.preventDefault();
        const formData = new FormData(event?.currentTarget);

        const result = customerSchema.safeParse(Object.fromEntries(formData))

        if (!result.success) {
        alert(result.error.issues[0].message)
        return
    }

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
        <div className="bg-yellow-100 min-h-500">
            <div className="py-4 px-5 mt-5 mx-auto max-w-300 border border-2 rounded-md border-gray-200 bg-white">
                <div className="p-6">
                    <h1 className="text-2xl">Your Details</h1>
                    <p>Please provide your information to continue</p>

                    <div className="grid-cols-3 flex justify-center bg-yellow-100">
                        <div className="border p-6">
                            <h1>Venue</h1>
                            <div className="font-bold">{booking.venue}</div>
                        </div>
                        <div className="border p-6">
                            <h1>Session</h1>
                            <div className="font-bold">{booking.session}</div>
                        </div>
                        <div className="border p-6">
                            <h1>Date</h1>
                            <div className="font-bold">{booking.date}</div>
                        </div>
                    </div>


                    <form onSubmit={Next}>
                        <div className="mt-5">
                            <h1 className="text-xl mb-2">1. Contact Person</h1>

                            <div className="mb-3">
                                <h1 className="font-bold">Full Name *</h1>
                                <input type="text" name="fullName" className="w-full border-1 rounded border-gray-300"></input>
                            </div>

                            <div className="mb-3">
                                <h1 className="font-bold">Phone Number *</h1>
                                <input type="text" name="phoneNo" className="w-full border-1 rounded border-gray-300"></input>
                            </div>

                            <div className="mb-3">
                                <h1 className="font-bold">Email Address *</h1>
                                <input type="text" name="emailAddress" className="w-full border-1 rounded border-gray-300"></input>
                            </div>

                            <h1 className="text-xl mb-2">2. Event Details</h1>

                            <div className="mb-3">
                                <h1 className="font-bold">Type of Event *</h1>
                                <select className="border-1 p-2 w-full" name="typeOfEvent">
                                    <option value="Wedding">Wedding</option>
                                    <option value="Aqiqah">Aqiqah</option>
                                    <option value="Nikah">Nikah</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <h1 className="font-bold">Bride Name</h1>
                                <input type="text" name="brideName" className="w-full border-1 rounded border-gray-300"></input>
                            </div>

                            <div className="mb-3">
                                <h1 className="font-bold">Groom's Name</h1>
                                <input type="text" name="groomName" className="w-full border-1 rounded border-gray-300"></input>
                            </div>

                            <div className="mb-3">
                                <h1 className="font-bold">Guest Count Pax</h1>
                                <input type="text" name="guestCount" className="w-full border-1 rounded border-gray-300"></input>
                            </div>

                            <div className="flex justify-between">
                                <button className="border-1 p-2 m-2 w-50 rounded-xl"> {"<"} Back</button>
                                <button className="border-1 p-2 m-2 w-50 rounded-xl text-white bg-green-900">Next {">"}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}