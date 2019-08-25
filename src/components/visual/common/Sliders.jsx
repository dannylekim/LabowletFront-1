import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../../styles/slider.scss';


const handleStyle = {
  transition: 'all 0ms linear 0s',
};

const trackStyle = {
  transition: 'all 150ms linear 0s',
}

const dotStyle = {
  border: '#000000',
}


const Sliders = (props) => {
  return (
    <Slider
      min={props.min}
      max={props.max}
      defaultValue={props.default}
      dots
      onChange={(e) => props.handleChange(e)}
      handleStyle={handleStyle}
      trackStyle={trackStyle}
      dotStyle={dotStyle}
    />
  );
}

export default Sliders;