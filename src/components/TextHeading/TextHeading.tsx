import React from 'react';
import "./textHeading.css"

interface HeadingWithTextProps {
  h1Text: string;
  pText: string;
}

const HeadingWithText: React.FC<HeadingWithTextProps> = ({ h1Text, pText }) => {
  return (
    <div className="travelTextArea">
      <h1>{h1Text}</h1>
      <p>{pText}</p>
    </div>
  );
};

export default HeadingWithText;
