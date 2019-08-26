import React from 'react';

import '../../../styles/playericon.scss';
import Icon from './Icon';

const PlayerIcon = (props) => {
  const color = props.color ? props.color : 'white';
  return (
    <div className='player-icon' style={{ backgroundColor: color}}>
      <Icon size={`40px`} fill={props.fill} iconId={props.id}/>
    </div>
  );
}

export default PlayerIcon;