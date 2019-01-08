import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import '../../../styles/teamCards.scss';

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

  componentWillUnmount() {
    setTimeout(() => {
      this.unmountStyles();
    }, 30);
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
  
  render() {
    return (
      <div className="team-card" onClick={() => this.props.joinTeam(this.props.index)} style={this.state.styles}>
        <div className="team-card-title">
          <h3>TEAM {this.props.index}</h3>
        </div>
        <div className="team-card-container">
          {this.props.teamMates}
        </div>
      </div>
    );
  }
}

export default TeamCard;