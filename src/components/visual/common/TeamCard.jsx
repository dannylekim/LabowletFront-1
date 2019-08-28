import React, {PureComponent} from 'react';
import Proptypes from 'prop-types';
import '../../../styles/teamCards.scss';
import PlayerIcon from "./PlayerIcon";

const ORIGINAL_STYLES = {
  opacity: '0',
  transform: 'scale(0.1)',
}
const MOUNTED_STYLES = {
  opacity: '1',
  transform: 'scale(1)',
}
const CARD_TRANSITION = 'cubic-bezier(0.18, 0.89, 0.32, 1.28)';

class TeamCard extends PureComponent {
  static get propTypes() {
    return {
      joinTeam: Proptypes.func,
      id: Proptypes.string,
      name: Proptypes.string,
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      styles: Object.assign(ORIGINAL_STYLES),
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.mountStyles();
    }, 40 + this.props.index * 10);
  }

  mountStyles() {
    this.setState((prev) => ({
      styles: Object.assign({
        transition: `600ms ${CARD_TRANSITION} ${100 * this.props.index}ms`
      }, MOUNTED_STYLES),
    }));
  }

  unmountStyles() {
    this.setState((prev) => ({
      styles: Object.assign(prev.styles, ORIGINAL_STYLES),
    }));
  }
  
  /**
   * @function renderTeamates
   * @description render teamate names. Default Empty otherwise
   * @param {Array} teamMates 
   */
  renderTeamates(teamMates) {
    if (teamMates.length === 0) {
      return ['Empty', 'Empty'];
    }

    const teamList = teamMates;

    if (teamList.length === 1 ){
      teamList.push({name: 'Empty', uniqueIconReference: 99});
    } 

    return teamList;
  } 

  render() {
    const { teamMates } = this.props;
    const myTeamMates = this.renderTeamates(teamMates).map((member) => <div><p>{member.name}</p>       <PlayerIcon
        color={(member.uniqueIconReference !== 99) ? `#47f57b` : `#f57373`} id={member.uniqueIconReference}
        fill={`#000`}/>
    </div>);
    return (
      <div className="team-card" onClick={() => this.props.joinTeam(this.props.key)} style={this.state.styles}>
        <div className="team-card-title">
          <h3>{this.props.name}</h3>
        </div>
        <div className="team-card-container">
          {myTeamMates}
        </div>
      </div>
    );
  }
}

export default TeamCard;