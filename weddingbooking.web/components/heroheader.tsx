export default function HeroHeader()
{
    return (
    <section className="min-h-[500] bg-cover bg-center" style={{ backgroundImage: "url('/kahwinheader.jpg')" }}>
        <div className="flex min-h-[500] bg-gradient-to-r items-center from-white to-transparent px-6 md:px-16">
            <div className="max-w-xl">
            <p className="text-amber-500">CREATE YOUR PERFECT MOMENT</p>
            <h1 className="text-3xl mb-4 mt-4">A Timeless Venue For<br/> Your Perfect Day</h1>
            <h1>Zuljannah Palace offer elegant and spacious venue</h1>
            <button className="bg-emerald-800 px-6 py-3 mt-5 text-white rounded">Check Availability</button>
            </div>
            </div>
    </section>
    )
}