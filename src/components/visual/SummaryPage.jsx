import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring'

import '../../styles/summary.scss';
import connectToRedux from '../ReduxConnector';

const SummaryPage = (props) => {
  const resultTracker = [...props.game.scoreSummary].sort((a, b) => b.previousScore - a.previousScore);
  const [result, setResult] = useState(resultTracker)
  const [canIncrement, setIncrementStatus] = useState(true);
  const [firstTime, setFirst] = useState(true);

  useEffect(() => {
    if(firstTime) {
      setTimeout(() => {
        setFirst(false);
        incrementPoints(result);
      }, 1000)
    } else if(!firstTime && canIncrement) {
      incrementPoints(result);
    }
  })

  /**
   * used to increment points and check if it should loop through teams to increment again
   */
  const incrementPoints = (currentResult) => {
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

  const formatData = ({ item, key, props: { y } }, index, total) => {
    return (
      <animated.div
        key={key}
        className="animate-team-row"
        style={{
          zIndex: total.length - index,
          transform: y.interpolate(currentY => `translate3d(0,${currentY}px,0)`),
        }}
      >
        <div className="animate-row__content">
          <p>{item.team.teamName}</p>
          <p>{item.previousScore}</p>
        </div>
      </animated.div>
    )
  };
  
  const transition = useTransition(
    result.sort((a, b) => b.previousScore - a.previousScore).map((data, i) => ({ ...data, y: 75 * (i + 1) })),
    result => result.team.teamId,
    {
      enter: ({ y }) => ({ y }),
      update: ({ y }) => (canIncrement ? {} : { y }),
    }
  );

  const dataAnimation = transition.map(formatData)

  const isAdmin = true//props.user.id === props.room.settings.host.id;

  return (
    <div className="summary__page">
        <div className="summary__content">
          {dataAnimation}
        {(!canIncrement && isAdmin) && <button className="summary__continue-btn" onClick={handleClick}>Next round!</button>}
        </div>
    </div>
  )
}

const connectObject = {
  states: ['game', 'user', 'room'],
  actions: ['updatePoints'],
}

export default connectToRedux(SummaryPage, connectObject);