import React from 'react';
import '../../styles/splash.scss';
import Logo from '../../assets/images/labowless_logo_white.png';

const SplashPage = (props) => {

  return (
    <div className="splash__page">
      <div className="splash__logo">
        <img src={Logo} alt="logo"/>
      </div>
    </div>
  )
}

export default SplashPage;