
/**
 * Formats the object properly to satisfy server checks.
 * @param {Object} state 
 * @returns {Object}
 */
const RoomSettings = (state) => {
  const {
    maxTeams,
    wordsPerPerson,
    allowSkips,
    roundTimeInSeconds,
    rounds,
  } = state;

  const roundTypes = rounds.reduce((roundsSelected, current) => {
    if(current.value) {
      roundsSelected.push(current.code);
    }
    return roundsSelected;
  }, []);

  return {
    maxTeams,
    wordsPerPerson,
    allowSkips,
    roundTimeInSeconds,
    roundTypes,
    // rounds: roundTypes.length,
  }
}

export default {
  RoomSettings,
}