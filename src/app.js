import app from 'ampersand-app'
import Router from './router'
require('./styles/main.styl')
require('octicons/octicons/octicons.css')
import Me from './model/me'

window.app = app

app.extend({
  init () {
    this.me = new Me()
    this.me.fetchInitialData()
    this.router = new Router()
    this.router.history.start()
  }
})

app.init()
