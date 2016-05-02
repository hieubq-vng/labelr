const config = {
  'localhost': {
    authUrl: 'https://hieubq-gatekeeper.herokuapp.com/authenticate/',
    clientId: 'b93da229a8b6eec7da46'
  },

  'hieubq-learnreact.surge.sh': {
    authUrl: 'https://hieubq-surge-label.herokuapp.com/authenticate/',
    clientId: '1263095717447ada41ff'
  }
}[window.location.hostname]

export default config
