"use client";

import { useState } from "react";
import { DayPicker } from "@daypicker/react";
import { useBookingStore } from "@/store/bookingStore";
import { useRouter } from "next/navigation";
import "@daypicker/react/style.css";

export default function DateVenue() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const router = useRouter();
  const [selectedSession, setSelectedSession] = useState("");
  const updateBooking = useBookingStore(
    (state) => state.updateBooking
  )

function sessionSelection(session: string) {
  setSelectedSession((currentSession) =>
    currentSession === session ? "" : session
  );
}

function Next ()
{
    if(!selectedDate)
        return

    if(!selectedSession)
        return

    //convert date into string format 
    const formattedDate = [
    selectedDate.getFullYear(), // 2026
    String(selectedDate.getMonth() + 1).padStart(2, "0"), // 09
    String(selectedDate.getDate()).padStart(2, "0"), // 08
    ].join("-");

    updateBooking(
        {
            date : formattedDate,
            session : selectedSession
        }
    )

    router.push("/customerdetail");
}


  return (

    <div className="mx-auto w-full max-w-[1200px]">
        <h1 className="px-10 grid grid-cols-2 text-3xl p-4">Choose Date & Session</h1>
        <h1 className="grid grid-cols-2 text-1xl">Pick dates and session that is avalaialbe</h1>
        <div className="grid grid-cols-2">
        <div>
            
            <p>1. Select Date</p>
            <div className="mt-6 inline-block rounded-xl border bg-white p-4 text-black shadow">
                <DayPicker className=""
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                />
            </div>
        </div>

        <div>
            <h1 className="mb-6">2. Select session</h1>
            <div className="">
                    <button
                    type="button"
                    onClick={() => sessionSelection("Morning")}
                    className={`mb-3 w-full cursor-pointer rounded border-2 p-6 text-left ${
                        selectedSession === "Morning"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-300 bg-white"
                    }`}
                    >
                    Morning Session
                    </button>
                    <button
                    type="button"
                    onClick={() => sessionSelection("Evening")}
                    className={`mb-3 w-full cursor-pointer rounded border-2 p-6 text-left ${
                        selectedSession === "Evening"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-300 bg-white"
                    }`}
                    >
                    Evening Session
                    </button>
            </div>
        </div>
        </div>

        <div className="flex justify-end">
            <button className="bg-emerald-700 py-4 px-4 mr-4 text-white rounded" onClick={()=>Next()}>Next</button>
        </div>
    </div>
  );
}