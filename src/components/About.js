import Link from "next/link";

export function About()
{
    return(
        <div className="relative m-0 p-0">
            <div className="max-w-full">
                <img className="w-full" src='/about-us-background.webp' alt="" />
            </div>
            <div className="absolute w-full flex justify-end xl:top-52 xl:p-16 lg:top-36 lg:p-16 md:top-24 md:p-10 sm:top-16 sm:p-4 top-6 p-4">
                <div className="flex-col flex-wrap">
                    <h1 className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl font-serif text-white font-black xl:py-10 lg:py-10 md:py-10 sm:py-10 py-5">WHO IS C.C. PAZZINI<sup className="mb-4">TM</sup>?</h1>
                    <Link href={'/About'} className="xl:px-14 xl:py-3 lg:px-14 lg:py-3 md:px-14 md:py-3 sm:px-10 sm:py-2 px-4 py-1 bg-white uppercase gap-4 text-primary rounded-full xl:text-lg lg:text-lg md:text-lg sm:text-md text-sm items-center font-[1000] font-sans">About Us</Link>
                </div>
            </div>
        </div>
    )
}