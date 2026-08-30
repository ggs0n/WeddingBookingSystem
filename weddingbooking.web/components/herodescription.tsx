import { Gem, ListCheck,User,UserRound } from "lucide-react"

export default function HeroDesc()
{
    return (
        <div className="grid grid-cols-3 py-5 bg-amber-50">
            <div className="text-center">
                <Gem className="mx-auto"></Gem>
                <h3 className="text-2xl">Elegant Venus</h3>
                <h2>Spacious & Beautiful</h2>
            </div>
            <div className="text-center">
                <ListCheck className="mx-auto"></ListCheck>
                <h3 className="text-2xl">Complete Package</h3>
                <h2>Spacious & Beautiful</h2>
            </div>
            <div className="text-center">
                <UserRound className="mx-auto"></UserRound>
                <h3 className="text-2xl">Professional Team</h3>
                <h2>Spacious & Beautiful</h2>
            </div>
        </div>
    )
}