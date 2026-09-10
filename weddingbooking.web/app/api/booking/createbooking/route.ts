import { prisma } from "@/lib/prisma"


export async function POST(request : Request) {
    try {
        const body = await request.json()

        const booking = await prisma.booking.create({
            data: {
                date : body.date,
                guestCount: Number(body.guestCount),
                venue: body.venue,
                session: body.session,
                brideName: body.brideName,
                groomName: body.groomName,
                typeOfEvent: body.typeOfEvent,
                customerName : body.customerName,
                customerEmail : body.customerEmail,
                customerPhone : body.customerPhone,
            },
        })

        return Response.json(
            {
                message: "Booking created",
                bookingId: booking.id,
            },
            { status: 201 },
        )
            
        
    }

    catch(error)
    {
        console.error(error)
    }
};