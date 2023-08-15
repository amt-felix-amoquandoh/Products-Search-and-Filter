// Home.tsx
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import HeroBackground from "../assets/images/homepage/hero.png";
import Discover from "../components/Discover/Discover";
import Cover from "../components/Cover/Cover";
import TravelSwiper from "../components/Travel Swiper/TravelSwiper";
import Experience from "../components/Experience/Experience";
import Footer from "../components/Footer/Footer";
import Destinations from "../components/Destinations/Destinations";

const Home: React.FC = () => {
  // Your component logic here
  return (
    <>
    <Navbar />
    <Hero 
        className="homeHero"
        textClass="heroText"
        heroImage={HeroBackground}
        title="Enjoy Your Dream Vacation"
        text="Lorem ipsum dolor sit amet consectetur. Amet dignissim et enim id ipsum leo amet. Pellentesque l
        obortis ultrices molestie imperdiet lectus at. Turpis morbi adipiscing quis pulvinar. Ullamcorper pellentesque sc
        elerisque quis porttitor ipsum eget consectetur. Arcu tincidunt facilisi orci nulla turpis egestas tellus pulvinar elit. Vel iaculis s
        ed vivamus dignissim et cras."
        />
    <Discover />
    <Cover />
    <TravelSwiper />
    <Experience />
    <Destinations />
    <Footer />
    </>
  )
};

export default Home;

export {}; 