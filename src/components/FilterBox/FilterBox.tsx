import React from 'react';
import "./filterBox.css";
import HeadingWithText from '../TextHeading/TextHeading';
import mapImg from "../../assets/icons/map.png"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import TravelCards from '../Travel Swiper/travelCards';
import image1 from "../../assets/images/accomodation/swiper1.png";
import image2 from "../../assets/images/accomodation/swiper2.png";
import image3 from "../../assets/images/accomodation/swiper3.png";
import image4 from "../../assets/images/accomodation/swiper4.png";
import image5 from "../../assets/images/accomodation/swiper5.png";
import image6 from "../../assets/images/accomodation/swiper6.jpg";
import image7 from "../../assets/images/accomodation/swiper7.jpg";
import image8 from "../../assets/images/accomodation/swiper8.jpg";
import image9 from "../../assets/images/accomodation/swiper9.jpg";
import ProductsFilter from '../ProductsFilter/ProductsFilter';



const FilterBox: React.FC = () => {
  return (
    <>
    <div className='filterArea'>
       <div className='heading'>
        <HeadingWithText
         h1Text='Last minute accommodation near you'
         pText='Find a great deal on a accommodation for tonight or an upcoming trip'
         />
         <img src={mapImg} alt="map" />
       </div>
       <div>
        {/* filter and products */}
        <ProductsFilter />
       </div>
       <div className='swiperArea'>
       <HeadingWithText
        h1Text="More accommodation"
        pText="Dive into our world of apartments and other unique accommodation"
      />
       <div className="text-grey">
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
        <SwiperSlide>
        <TravelCards imageUrl={image6} cardText="Grand Canyon" cardHeading={''}  />
        </SwiperSlide>
        <SwiperSlide>
        <TravelCards imageUrl={image7} cardText="Myanmmar" cardHeading={''}  />
        </SwiperSlide>
        <SwiperSlide>
        <TravelCards imageUrl={image8} cardText="Myanmmar" cardHeading={''}  />
        </SwiperSlide>
        <SwiperSlide>
        <TravelCards imageUrl={image9} cardText="Myanmmar" cardHeading={''}  />
        </SwiperSlide>
      </Swiper>
    </div>
       </div>
    </div>
    </>
  );
};

export default FilterBox;

  
export {}; 