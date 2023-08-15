import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "./swiper.css";
import DiscoverCards from "./DiscoverCards";
import image1 from "../../assets/images/homepage/discover1.png";
import image2 from "../../assets/images/homepage/discover2.png";
import image3 from "../../assets/images/homepage/discover3.png";
import image4 from "../../assets/images/homepage/discover4.png";
import image5 from "../../assets/images/homepage/discover5.png";
import image6 from "../../assets/images/homepage/discover6.png";
import image7 from "../../assets/images/homepage/discover7.png";


const MySwiper: React.FC = () => {
  return (
    <div className="swiperContainer">
      <Swiper>
        <SwiperSlide>
          <DiscoverCards imageUrl={image1} cardText="Ghana"  />
        </SwiperSlide>
        <SwiperSlide>
        <DiscoverCards imageUrl={image2} cardText="Sydney"  />
        </SwiperSlide>
        <SwiperSlide>
        <DiscoverCards imageUrl={image3} cardText="St.Thomas"  />
        </SwiperSlide>
        <SwiperSlide>
        <DiscoverCards imageUrl={image4} cardText="Japan"  />
        </SwiperSlide>
        <SwiperSlide>
        <DiscoverCards imageUrl={image5} cardText="France"  />
        </SwiperSlide>
        <SwiperSlide>
        <DiscoverCards imageUrl={image6} cardText="Grand Canyon"  />
        </SwiperSlide>
        <SwiperSlide>
        <DiscoverCards imageUrl={image7} cardText="Myanmmar"  />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MySwiper;
