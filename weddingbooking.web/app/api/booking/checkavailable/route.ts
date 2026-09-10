import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
    if(!request)
    return

    const body = await request.json()

    const bookings = await prisma.booking.findMany({
        where: {
            venue: body.venue,
        },
        select: {
            date: true,
            session: true,
        },
    })

    const dates = [...new Set(
        bookings.map((booking) => booking.date)
    )]

    const fullyBookedDates = dates.filter((date) => {
        const morningBooked = bookings.some(
            (booking) =>
                booking.date === date &&
                booking.session === "Morning"
        )

        const eveningBooked = bookings.some(
            (booking) =>
                booking.date === date &&
                booking.session === "Evening"
        )

        return morningBooked && eveningBooked
    })

    return Response.json({
    bookedSlots: bookings,
    fullyBookedDates,
})
}