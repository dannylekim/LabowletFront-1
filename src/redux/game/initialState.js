const state = {

  // Stuff to do with uer
  teamPoints: 0, // current user's team point
  status: '', // player status ['GUESSER', 'ACTOR', 'SPECTATOR']

  // GAME INFO
  content: [], // final game result // ignore irrelavent name, too tired to fix
  currentWord: '', // word to guess
  currentTime: 0, // should be default to seconds until further notice
  gameType: '', // round type


  // used to verify player readiness
  readyState: {
    room: false,
    word: false,
  },
  listOfWordsReady: []
}

export default state;