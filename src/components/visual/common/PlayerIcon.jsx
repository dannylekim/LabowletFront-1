import React from 'react';

import '../../../styles/playericon.scss';

const PlayerIcon = (props) => {
  const color = props.color ? props.color : 'white';
  const firstLetter = props.name.toUpperCase().charAt(0)
  return (
    <div className='player-icon' style={{ backgroundColor: color}}>
      <p>{firstLetter}</p>
    </div>
  );
}

export default PlayerIcon;