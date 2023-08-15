import React from 'react';
import "./experience.css";
import experienceimage from "../../assets/images/homepage/experience1.png";
import experienceimage1 from "../../assets/images/homepage/experience2.png"


const Experience: React.FC = () => {
  return (
    <>
    <div className='experienceframe'>
     <div className='experiencecontent'>
     <div className='experienceText'>
      <div className='heading'>
       <p>Let us use our experience to serve you better</p>
      </div>
      <div className='description'>
        <span>Lorem ipsum dolor sit amet consectetur. Amet sed proin feugiat at amet. Lorem vulputate orci tempus eu vestibulum. Convallis dictumst ut a senectus. Volutpat ac in et praesent nullam vitae. Neque lectus eget scelerisque est ultricies donec libero quis. Tempus ultricies sit cras scelerisque turpis est in. Odio tristique nibh aliquam accumsan non tempus.</span>
      </div>
      <div className='experiencedata'>
        <span>
            <p>2yrs</p>
            <h6>Lorem ipsum</h6>
        </span>
        <span>
            <p>10+</p>
            <h6>Lorem ip id</h6>
        </span>
        <span>
            <p>700+</p>
            <h6>Lorem ips</h6>
        </span>
        <span>
            <p>15k+</p>
            <h6>Lore id</h6>
        </span>
      </div>
     </div>
     <div className='imgBox1'>
     <img src={experienceimage1} alt="experienceimg" />
     </div>
     <div className='imgBox2'>
     <img src={experienceimage} alt="experienceimg1" />
     </div>     
     </div>
    </div>
    </>
  );
};

export default Experience;

  
export {}; 