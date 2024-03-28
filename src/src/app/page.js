import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header.js";
import Hero from "../components/Hero.js";
import HomeMenu from "../components/HomeMenu.js";
import SectionHeaders from "../components/SectionHeaders.js";

export default function Home() {
  return (
    <>
      <Hero/>
      <HomeMenu/>
      <section className="text-center my-16">
        <SectionHeaders subHeader={'Our Story'} mainHeader={'About Us'}/>
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum perferendis est sequi non ad ab, cumque ipsa odio? Odio repellat dignissimos ut voluptate recusandae, officia enim culpa saepe esse asperiores!
            Iste alias eum a! Accusamus iusto quisquam minima doloribus fugiat tenetur quasi reprehenderit laudantium incidunt necessitatibus magnam reiciendis dolorem vero quos ipsa autem maiores, porro hic natus, ea expedita cum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum perferendis est sequi non ad ab, cumque ipsa odio? Odio repellat dignissimos ut voluptate recusandae, officia enim culpa saepe esse asperiores!
            Iste alias eum a! Accusamus iusto quisquam minima doloribus fugiat tenetur quasi reprehenderit laudantium incidunt necessitatibus magnam reiciendis dolorem vero quos ipsa autem maiores, porro hic natus, ea expedita cum.
            Consectetur quasi officia vel minima maxime beatae obcaecati molestias provident ex, expedita cum doloremque! Porro beatae ut saepe consequuntur. Possimus quia quibusdam assumenda maiores nisi natus laudantium aperiam placeat repudiandae!
          </p>
          <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum perferendis est sequi non ad ab, cumque ipsa odio? Odio repellat dignissimos ut voluptate recusandae, officia enim culpa saepe esse asperiores!
            Iste alias eum a! Accusamus iusto quisquam minima doloribus fugiat tenetur quasi reprehenderit laudantium incidunt necessitatibus magnam reiciendis dolorem vero quos ipsa autem maiores, porro hic natus, ea expedita cum.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders 
          subHeader={"Don\'t hesitate"}
          mainHeader={"Contact Us"}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+46738123123">
            +43 738 123 123
          </a>
        </div>
      </section>
    </>
  );
}
