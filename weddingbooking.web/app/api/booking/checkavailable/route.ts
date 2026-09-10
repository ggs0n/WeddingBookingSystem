import { prisma } from "@/lib/prisma";



export async function POST(request : Request)
{
    const body = await request.json()

    const venue = body.venue
    const date = body.date

    const bookedSlots = await prisma.booking.findMany({
        where : {
            venue,
            date,
        },
        select: {
            session : true,
            venue : true,
            date : true
        }
    })

    return Response.json({
        bookedSlots,
    
})}