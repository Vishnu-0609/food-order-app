export default function AboutPage()
{
    return(
        <section className="mt-16">
            <div className="menu-image py-8 flex justify-center">
                <div className="relative flex flex-col items-center">
                    <h1 className="xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-3xl font-black text-white py-4 mt-2">CICIS PIZZA HISTORY</h1>
                    <p className="xl:w-2/3 lg:w-3/4 md:w-4/5 sm:w-11/12 w-full px-4 xl:text-2xl lg:text-xl md:text-lg sm:text-lg text-lg py-4 font-black text-white my-2">Cicis has given you a taste of the best of pizza and beyond since 1985. Get to know our story and brand history.</p>
                </div>
            </div>
            <div className="mt-16 grid grid-rows-1 gap-2 px-8">
                <div className="">
                    <h1>30+ YEARS OF DELICIOUS PIZZA</h1>
                </div>
                <div className="grid xl:grid-cols-2 lg:grid-cols-2 gap-4 py-4">
                    <div className="grid grid-rows-2 gap-4">
                        <div className="flex gap-2">
                            <div>
                                <img className="rounded-3xl" src="/ourstory_1.webp" alt="ourstory_1"/>
                            </div>
                            <div>
                                <img className="rounded-3xl" src="/ourstory_2.webp" alt="ourstory_2"/>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div><img className="rounded-3xl" src="/ourstory_3.webp" alt="ourstory_3"/></div>
                            <div><img className="rounded-3xl" src="/ourstory_4.png" alt="ourstory_4"/></div>
                        </div>
                    </div>
                    <div className="text-lg">
                        <p className="py-2">In 1985, Cicis opened its doors for the very first time in Plano, Texas – and just like that, the Original home of all the pizza, pasta, salad, and desserts you can eat was born. For nearly four decades, Cicis has been committed to creating fun, family-friendly restaurants where guests can spend quality time together and enjoy all their favorites for one low price.</p>
                        <p className="py-2">Consistently adapting to meet the changing needs of its guests in recent years, Cicis put a stronger focus on its off-premise options with the launch of online ordering, and new menu items. Now, fans can easily order their favorites for pick-up or delivery at Cicis locations across the country, making it easier for guests to enjoy TBPVA™, wherever they want to!  TBPVA™, you ask?  The Best Pizza Value Anywhere! </p>
                        <p className="py-2">Today, the brand has more than 300 restaurants in 30-plus states and has been ranked by CNN Money as the No. 1 “Casual Dining Pizza Chain (for your money) in America,” named by Technomic as the No. 2 “Most Kid-Friendly Chain as voted by Millennial Moms” and recognized by Nation’s Restaurant News among its Top 200 Restaurant Chains and Franchise Times Top 400.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}