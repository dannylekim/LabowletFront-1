import React from 'react';

//NOT WORKING, DON'T USE. 
// as of v0.7.2, wiredjs doesnt support customization
const WiredSlider = (porps) => {
  return (
    <wired-slider 
      knobradius="10"
      value="1"
      min="1"
      max="5"
      change={(e) => console.log(e)}
    ></wired-slider>
  );
}

export default WiredSlider;