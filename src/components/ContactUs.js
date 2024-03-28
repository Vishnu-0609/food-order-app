export default function ContactPage()
{
    return (
        <section className="flex flex-col bg-[#a4241c] text-center border-0 m-0 p-0 " id="contact"> 
            <div className="w-full h-full py-4 text-center">
                <div>
                    <h1 className='xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl font-serif text-white font-black pt-10'>NEVER MISS OUT ON AMAZING DEALS AT CICIS!</h1>
                </div>
                <div>
                    <p className='xl:text-2xl lg:text-3xl md:text-2xl sm:text-xl font-serif text-white font-black pt-5 tracking-tight'>SIGN UP FOR NEW PIZZABILITIES</p>
                </div>
            </div>
            <div className="w-full h-full py-4 text-center flex flex-col px-28">
                <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 gap-4 sm:grid-cols-1">
                    <div className="flex flex-col items-start">
                        <label className="text-black text-xl pl-1" htmlFor="">First Name</label>
                        <input className="mt-1 text-lg" type="text"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <label className="text-black text-xl pl-1" htmlFor="">Last Name</label>
                        <input className="mt-1 text-lg" type="text"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <label className="text-black text-xl pl-1" htmlFor="">Email</label>
                        <input className="mt-1 text-lg" type="text"/>
                    </div>
                </div>
                <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 gap-4 sm:grid-cols-1 sm:pt-3">
                    <div className="flex flex-col items-start">
                        <label className="text-black text-xl pl-1" htmlFor="">Phone Number</label>
                        <input className="mt-1 text-lg" type="tel"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <label className="text-black text-xl pl-1" htmlFor="">BirthDay</label>
                        <input className="mt-1 text-lg" type="date"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <label className="text-black text-xl pl-1" htmlFor="">PinCode</label>
                        <input className="mt-1 text-lg" type="text"/>
                    </div>
                </div>
                <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 gap-4 sm:grid-cols-1 sm:pt-3">
                    <div className="flex flex-col items-start">
                        <label className="text-black text-xl pl-1" htmlFor="">What's your Buffet fave?</label>
                        <input className="mt-1 text-lg" type="text"/>
                    </div>
                </div>
                <div className="flex justify-end sm:mt-2">
                    <button className="px-12 py-3 rounded-3xl bg-black text-white text-xl font-black">Submit</button>
                </div>
            </div>
        </section>
    );
}