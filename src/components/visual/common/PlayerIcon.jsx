import React from 'react';

import '../../../styles/playericon.scss';

const PlayerIcon = (props) => {
  const firstLetter = props.name.toUpperCase().charAt(0)
  return (
    <div className='player-icon'>
      <p>{firstLetter}</p>
    </div>
  );
}

export default PlayerIcon;