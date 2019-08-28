const state = {
  loading: false,
  loadingProgress: 100,
  page: '',
  server: {
    label: '',
    url: '',
  },
  debugMode: (process.env.NODE_ENV !== 'production'),
};

export default state;