import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header.js";
import Hero from "../components/Hero.js";
import HomeMenu from "../components/HomeMenu.js";
import SectionHeaders from "../components/SectionHeaders.js";
import HeroLabel from "@/components/HeroLabel.js";
import SubHero from "@/components/SubHero.js";
import { About } from "@/components/About.js";
import ContactUs from "@/components/ContactUs.js";

export default function Home() {
  return (
    <>
      <Hero/>
      <SubHero/>
      <HeroLabel/>
      <HomeMenu/>
      <About/>
      <ContactUs/>
    </>
  );
}
