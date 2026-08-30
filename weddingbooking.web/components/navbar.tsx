import Link from "next/link"

export default function Navbar()
{
    return (
        <nav className="flex items-center py-4 pl-2 justify-between">
            <div className="text-center pl-4 mt-5">
                <img className="mx-auto h-10" src="/logozp.png"></img>
                <div className="text-xl tracking-wide">ZULJANNAH</div>
                <div className="text-xl tracking-wide">PALACE</div>
            </div>

            <div className="flex items-center gap-6 mr-4">
                <Link href="/">Home</Link>
                <Link href="">About Us</Link>
                <Link href="/bookvenue">Venues</Link>
                <Link href="">Packages</Link>
                <Link href="">Gallery</Link>
                <Link href="">Contact</Link>
                <Link href="" className="rounded bg-amber-600 px-4 py-2 text-white">Check availability</Link>
            </div>
        </nav>
    )
}