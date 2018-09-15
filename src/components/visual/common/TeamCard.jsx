import React from 'react';
import '../../../styles/teamCards.scss';

const TeamCard = (props) => {
  const TeamMates = [...props.teamates].map((value) => <span>{value}</span>)
  return (
    <div className="team-card" onClick={(e) => props.handleClick(e)}>
      <div className="team-card-title">
        <h3>TEAM {props.team}</h3>
      </div>
      <div className="team-card-container">
        {TeamMates}
      </div>
    </div>
  );
}

export default TeamCard;