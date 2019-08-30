import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring'

import '../../styles/summary.scss';
import connectToRedux from '../ReduxConnector';

const DATA = [
  {
    previousScore: 5,
    totalScore: 6,
    team: {
      teamId: '1234',
      teamName: 'Im losing now',
    }
  },
  {
    previousScore: 0,
    totalScore: 10,
    team: {
      teamId: '4321',
      teamName: 'Im winning now',
    }
  }
]

const SummaryPage = (props) => {
  // const resultTracker = props.game.scoreSummary.sort((a, b) => b.previousScore - a.previousScore);
  const resultTracker = DATA.sort((a, b) => b.previousScore - a.previousScore);
  const [result, setResult] = useState(resultTracker)
  const [canIncrement, setIncrementStatus] = useState(true);
  const [firstTime, setFirst] = useState(true);

  useEffect(() => {
    if(firstTime) {
      setTimeout(() => {
        setFirst(false);
        handleTimer(result);
      }, 1000)
    } else if(!firstTime && canIncrement) {
      handleTimer(result);
    }
  })

  const handleTimer = (currentResult) => {
    // update each team points by incrementing points by 1
    const newResult = currentResult.map((value) => {
      if(value.previousScore < value.totalScore) {
        return {
          ...value,
          previousScore: value.previousScore + 1,
        }
      }
      return value;
    });

    // super hacky trick. I loop through the new result list to verify if all the previousScore and totalScore are equal. If so, turn off interval
    const incrementVerifier = newResult.reduce((acc, value) => {
      if ((value.previousScore < value.totalScore) && !acc) {
        return true;
      }
      return acc;
    }, false);

    setTimeout(() => {
      if (!incrementVerifier) {
        setIncrementStatus(incrementVerifier);
      }
      setResult(newResult);
    }, 100);
  }

  const handleClick = () => {
    console.log('nice job admin')
    props.updatePage('GAME');
  }

  const formatData = ({ team, previousScore, y}, index, total) => {
    return (
      <animated.div
        class="team-row"
        style={{
          zIndex: total.length - index,
          transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
        }}
      >
        <p>{team.teamName}</p>
        <p>{previousScore}</p>
      </animated.div>
    )
  };

  let DEFAULT_HEIGHT = 0;

  const dataAnimation = useTransition(
    result.sort((a, b) => b.previousScore - a.previousScore).map(formatData => ({ ...formatData, y: (DEFAULT_HEIGHT += 75) - 75 })),
    result => result.teamId,
    {
      enter: (data) => ({ ...data }),
      update: (data) => ({ ...data })
    }
  )

  const isAdmin = true//props.user.id === props.room.settings.host.id;

  return (
    <div className="summary__page">
      <div className="summary__content">
        {result.sort((a, b) => b.previousScore - a.previousScore).map(formatData)}
        {(!canIncrement && isAdmin) && <button onClick={handleClick}>Next round!</button>}
      </div>
    </div>
  )
}

const connectObject = {
  states: ['game', 'user', 'room'],
  actions: ['updatePoints'],
}

export default connectToRedux(SummaryPage, connectObject);