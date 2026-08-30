export default function Venus()
{
    return(
        <div className="text-center mt-4">
            <h1 className="text-4xl mb-2">Our Venues</h1>
            <h1 className="mb-6">Multiple stunning venus to make your special day unforgettable</h1>

            <div className="grid grid-cols-3 gap-5">
                <div className="py-5 p-10 mt-4 mb-4 bg-amber-50">
                    <img className="mb-4 rounded rounded-5 h-60" src="./zuljannahmain.jpg"></img>
                    <h1 className="text-2xl">Zuljannah Palace</h1>
                    <h1 className="mb-6">Grand ballroom</h1>
                    <button className="bg-green-800 py-6 px-5 rounded text-white">View Details</button>
                </div>

                <div className="py-5 p-10 mt-4 mb-4  bg-amber-50">
                    <img className="mb-4 rounded rounded-5 h-60" src="./glasshouse.jpg" width={400} height={400}></img>
                    <h1 className="text-2xl">Glass Tree</h1>
                    <h1 className="mb-6">modern glass-theme</h1>
                    <button className="bg-green-800 py-6 px-5 rounded text-white">View Details</button>
                </div>

                <div className="py-5 p-10 mt-4 mb-4  bg-amber-50">
                    <img className="mb-4 rounded rounded-5 h-60" src="./glasshouse2.jpg" width={400}></img>
                    <h1 className="text-2xl">Istana Kaca</h1>
                    <h1 className="mb-6">Grand ballroom</h1>
                    <button className="bg-green-800 py-6 px-5 rounded text-white">View Details</button>
                </div>
            </div>
        </div>
    )
}