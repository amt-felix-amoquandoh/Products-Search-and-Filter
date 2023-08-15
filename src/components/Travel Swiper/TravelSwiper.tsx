import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "./swiper.css";
import TravelCards from "./travelCards";
import image1 from "../../assets/images/homepage/accomodate2.png";
import image2 from "../../assets/images/homepage/accomodate3.png";
import image3 from "../../assets/images/homepage/accomodate1.png";
import image4 from "../../assets/images/homepage/accomodate4.png";
import image5 from "../../assets/images/homepage/accomodate5.png";
import HeadingWithText from "../TextHeading/TextHeading";
// import image6 from "../../assets/images/homepage/accomodate6.png";
// import image7 from "../../assets/images/homepage/accomodate7.png";


const TravelSwiper: React.FC = () => {
  return (
    <>
    <div className="travel">
    <HeadingWithText
        h1Text="Discover our unique Destinations"
        pText="From exotic islands to bustling cities, your dream destinations await!"
      />
    <div className="text-grey travelContainer">
      <Swiper>
        <SwiperSlide>
          <TravelCards imageUrl={image1} cardText="652,762 hotels" cardHeading="Hotels"  />
        </SwiperSlide>
        <SwiperSlide>
        <TravelCards imageUrl={image2} cardText="2265,773 apartments" cardHeading="Apartments"  />
        </SwiperSlide>
        <SwiperSlide>
        <TravelCards imageUrl={image3} cardText="124, 766 car rentals" cardHeading="Car Rental"  />
        </SwiperSlide>
        <SwiperSlide>
        <TravelCards imageUrl={image4} cardText="45,889 flights" cardHeading="Flight"  />
        </SwiperSlide>
        <SwiperSlide>
        <TravelCards imageUrl={image5} cardText="10,333 cabins" cardHeading="Cabins"  />
        </SwiperSlide>
        {/* <SwiperSlide>
        <TravelCards imageUrl={image6} cardText="Grand Canyon"  />
        </SwiperSlide>
        <SwiperSlide>
        <TravelCards imageUrl={image7} cardText="Myanmmar"  />
        </SwiperSlide> */}
      </Swiper>
    </div>
    </div>
    </>
  );
};

export default TravelSwiper;
