const state = {

  // Stuff to do with uer
  teamPoints: 0, // current user's team point
  status: '', // player status ['GUESSER', 'ACTOR', 'SPECTATOR']

  // GAME INFO
  content: [], // final game result // ignore irrelavent name, too tired to fix
  currentWord: '', // word to guess
  currentTime: 0, // should be default to seconds until further notice
  currentTeam: ' ',
  gameType: '', // round type
  remainingWords: 0,

  // used to verify player readiness
  readyState: {
    room: false,
    word: false,
  },
  listOfWordsReady: [],

  // global variable:
  maxTime: 0,
  scoreSummary: [],
}

export default state;