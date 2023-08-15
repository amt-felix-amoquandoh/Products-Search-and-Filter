import React from 'react';
import './hero.css';
import Searchbar from '../Searchbar/Searchbar';

interface HeroSectionProps {
  className: string;
  heroImage: string;
  textClass: string;
  title: string;
  text: string;

}

const HeroSection: React.FC<HeroSectionProps> = (props) => {
  return (
    <>
      <div className={props.className}>
        <img alt="heroImage" src={props.heroImage} />
        <div className={props.textClass}>
          <h1>{props.title}</h1>
          <Searchbar />
          <p>{props.text}</p>
        </div>
      </div>
    </>
  );
};

export default HeroSection;

  export {}; 