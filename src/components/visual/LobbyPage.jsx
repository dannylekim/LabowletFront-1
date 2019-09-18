import React, { PureComponent } from 'react';
import Swal from 'sweetalert2';

import connectToRedux from '../ReduxConnector';

import TeamCard from './common/TeamCard';
import PlayerIcon from './common/PlayerIcon';

import '../../styles/lobby.scss';

/**
 * @class LobbyPage
 */
class LobbyPage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isMaxed: false,
			createModalIsVisible: false,
			myTeamName: '',
			copied: false,
		};
		this._joinTeam = this._joinTeam.bind(this);
	}

	/**
	 * @function _checkMax
	 * @description Check if we reach max team creation
	 */
  _checkMax() {
		const isMaxed = !(!!this.props.room.settings.teams.find(value => value.name === 'Empty Slot'));
		this.setState({ isMaxed });
	}

	/**
	 * Create Team cards per max team
	 * @private
	 */
	_renderTeam(teams) {
		const TeamCardArray = teams
			.filter((value, index) => {
				if (value.teamMembers.length === 0) {
					return false;
				}

				return value;
			})
			.map(value => (
				<TeamCard
					key={value.teamId}
					joinTeam={() => this._joinTeam(value.teamId, value.teamName)}
					name={value.teamName}
					teamMates={value.teamMembers}
				/>
			));

		if (
			TeamCardArray.length === this.props.room.settings.roomSettings.maxTeams
		) {
			this.setState({
				isMaxed: true,
			});
		}
		return TeamCardArray;
	}

	_joinTeam(teamId, teamName) {
		this.props
			.joinTeam(teamId, teamName, this.props.user.token)
			.catch(err => {
				console.error(err);
			})
			.finally(() => {
				this._checkMax();
			});
	}

	addTeam = teamName => {
		this.props
			.createTeam(`Team ` + teamName)
			.catch(err => {
				Swal.fire({
					type: 'error',
					title: 'woops',
					text: err.message,
				});
			})
			.finally(() => {
				this._checkMax();
			});
	};

	startGame() {
		this.props.startGame();
	}

	copyToClip(code) {
		navigator.clipboard
			.writeText(code)
			.then(() => this.setState({ copied: true }));
		setTimeout(() => this.setState({ copied: false }), 3000);
	}

	handleCreateTeam = () => {
		return Swal.fire({
			title: 'Create a new team',
			input: 'text',
			preConfirm: this.addTeam,
			showCancelButton: true,
			inputValidator: value => {
				if (!value) {
					return 'You need to write something!';
				}
				if (this.state.isMaxed) {
					return 'Reached maximum team!';
				}
			},
		});
	};

	render() {
		const roomCode = this.props.room.code || 'UH OH';
		const { benchPlayers = [], teams = [] } = this.props.room.settings;
		const benchPlayersIcons = benchPlayers.map(player => (
			<PlayerIcon
				key={player.id}
				id={player.uniqueIconReference}
				fill={`#000`}
			/>
		));
		// By default we render 0 teams, user will have to create them themselves
		const teamList = this._renderTeam(teams);

		const isAdmin = this.props.user.id === this.props.room.settings.host.id;
		const canStart = this.props.room.settings.canStart;

		return (
			<div className="lobby">
				<div className="page-container">
					<div className="lobby__content">
						<div className="lobby__content-container">
							<p>Code is</p>
							<h1 onClick={() => this.copyToClip(roomCode)}>{roomCode}</h1>
							{this.state.copied && <p> Code copied to clipboard! </p>}
							{teamList}
							<div className="page-container__team-list">
								{this.state.isMaxed ? (
									''
								) : (
									<button
										className="add-team-btn"
										onClick={this.handleCreateTeam}
									>
										+
									</button>
								)}
							</div>
							{isAdmin && (
								<button
									disabled={!canStart}
									className={`generic-start-btn ${canStart ? '' : 'disabled'}`}
									style={{ color: `white`, margin: '40px' }}
									onClick={() => this.props.lobbyReady()}
								>
									Start
								</button>
							)}
						</div>
					</div>
				</div>
				<div className="page-footer">
					<div className="foot-header">
						<h3>Players waiting: </h3>
					</div>
					{benchPlayersIcons}
				</div>
			</div>
		);
	}
}

const connectObject = {
	states: ['room', 'user'],
	actions: ['createTeam', 'joinTeam', 'lobbyReady'],
};

export default connectToRedux(LobbyPage, connectObject);
