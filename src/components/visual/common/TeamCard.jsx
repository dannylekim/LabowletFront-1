import React from 'react';

const TeamCard = (props) => {
  return (
    <div className="team-card" onClick={(e) => props.joinTeam(e)}>
      <div className="team-card-title">
        <h3>TEAM {props.team}</h3>
      </div>
      <div className="team-card-container">
        {props.teamMates}
      </div>
    </div>
  );
}

export default TeamCard;