import { useBookingStore } from "@/store/bookingStore"

export default function CustomerDetail ()
{
    return (
        <div>
            <div className="py-4 px-5 mt-5 mx-auto max-w-250 border border-2">
                <div>
                    <h1 className="text-2xl">Your Details</h1>
                    <p>Please provide your information to continue</p>

                    <div className="grid-cols-3">
                        <div>
                            //venue
                        </div>
                        <div>
                            //date
                        </div>
                        <div>
                            //session
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}