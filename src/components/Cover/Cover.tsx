import React from 'react';
import "./cover.css";
import coverimage from "../../assets/images/homepage/cover.png"


const Cover: React.FC = () => {
  return (
    <>
    <div className='coverframe'>
     <div className='covercontent'>
     <div className='imgBox'>
     <img src={coverimage} alt="cover img" />
     </div>
     <div className='coverText'>
      <div className='heading'>
       <p> The end of the day. Travel to any country.</p>
      </div>
      <div className='description'>
        <span> Lorem ipsum dolor sit amet consectetur. Adipiscing est neque arcu adipiscing ornare. Etiam a nascetur faucibus vitae amet vulputate in aliquam maecenas. Diam amet integer elementum tincidunt placerat.</span>
      </div>
      <div className='coverbutton'>
        <button>
          Discover Now
        </button>
      </div>
      <div className='coverdata'>
        <span>09.99m</span>
        <span>19.99m</span>
      </div>
     </div>
     </div>
    </div>
    </>
  );
};

export default Cover;

  
export {}; 