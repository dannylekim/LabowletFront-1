import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const handleStyle = {
  backgroundColor: '#000000',
  border: '#000000',
};

const trackStyle = {
  backgroundColor: '#000000',
  border: '#000000',
  transition: 'all 300ms cubic-bezier(0.42, -0.33, 0.63, 0.68) 0s',
}

const dotStyle = {
  backgroundColor: '#000000',
  border: '#000000',

}


const Sliders = (props) => {
  return (
    <Slider
      min={2}
      max={6}
      defaultValue={3}
      marks={1}
      dots
      onChange={(e) => props.handleChange(e)}
      handleStyle={handleStyle}
      trackStyle={trackStyle}
      dotStyle={dotStyle}
    />
  );
}

export default Sliders;