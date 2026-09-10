import { Check } from "lucide-react"

const steps = ["Venue", "Date & Session", "Package", "Details", "Review"]

export default function BookingProgress({ currentStep }: { currentStep: number }) {
    return (
        <ol className="relative mb-7 grid grid-cols-5 gap-2" aria-label="Booking progress">
            <span
                className="absolute left-[10%] right-[10%] top-[18px] h-px bg-stone-300"
                aria-hidden="true"
            />

            {steps.map((label, index) => {
                const stepNumber = index + 1
                const complete = stepNumber < currentStep
                const active = stepNumber === currentStep

                return (
                    <li key={label} className="relative flex flex-col items-center text-center">
                        <span
                            className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                                complete || active
                                    ? "bg-emerald-900 text-white"
                                    : "bg-stone-200 text-stone-600"
                            }`}
                            aria-current={active ? "step" : undefined}
                        >
                            {complete ? <Check className="h-4 w-4" /> : stepNumber}
                        </span>
                        <span
                            className={`mt-2 text-xs sm:text-sm ${
                                active ? "font-semibold text-emerald-900" : "text-stone-600"
                            }`}
                        >
                            {label}
                        </span>
                    </li>
                )
            })}
        </ol>
    )
}
