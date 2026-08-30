"use client";

import { useState } from "react";
import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";

export default function DateVenue() {
  const [selectedDate, setSelectedDate] = useState<Date>();

  return (

    <div>
        <h1 className="px-10 grid grid-cols-2 text-3xl p-4">Choose Date & Session</h1>
        <h1 className="px-10 grid grid-cols-2 text-1xl">Pick date and session that is avalaialbe</h1>
        <div className="px-10 py-5 grid grid-cols-2">
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
                <div className="py-6 border border-2 border-b-emerald-800 rounded p-4 mb-3">
                    <h1>Morning Session</h1>
                </div>
                <div  className="py-6 border border-2 rounded p-4">
                    <h1>Evening Session</h1>
                </div>
            </div>
        </div>
        </div>

        <div className="flex justify-end">
            <button className="bg-emerald-700 py-4 px-4 mr-4 text-white rounded">Next {">"}</button>
        </div>
    </div>
  );
}