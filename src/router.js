import app from 'ampersand-app'
import Router from 'ampersand-router'
import React from 'react'
import ReactDOM from 'react-dom'
import qs from 'qs'
import xhr from 'xhr'

import Layout from './layout'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import ReposDetailPage from './pages/repo-detail'

export default Router.extend({
  renderPage (page, opts = {layout: true}) {
    if (opts.layout) {
      page = (
        <Layout me={app.me}>
          {page}
        </Layout>
      )
    }
    ReactDOM.render(page, document.getElementById('root'))
  },

  routes: {
    '': 'public',
    'repos': 'repos',
    'login': 'login',
    'auth/callback?:query': 'authCallback',
    'logout': 'logout',
    'repos/:owner/:name': 'repoDetail'
  },

  public () {
    console.log('public')
    this.renderPage(<PublicPage />, {layout: false})
  },

  repos () {
    console.log('repos')
    this.renderPage(<ReposPage repos={app.me.repos} />)
  },

  repoDetail (owner, name) {
    const model = app.me.repos.getByFullName(owner + '/' + name)
    this.renderPage(<ReposDetailPage repo={model} labels={model.labels}/>)
  },

  login () {
    window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
      client_id: 'b93da229a8b6eec7da46',
      redirect_uri: window.location.origin + '/auth/callback',
      scope: 'user, repo'
    })
  },

  authCallback (query) {
    query = qs.parse(query)
    console.log(query)
    xhr({
      url: 'https://hieubq-gatekeeper.herokuapp.com/authenticate/' + query.code,
      json: true
    }, (err, req, body) => {
      console.log(body)
      app.me.token = body.token
      app.router.history.navigate('/repos', {replace: true})
// this.redirectTo('/repos')
    })
  },

  logout () {
    window.localStorage.clear()
    window.location = '/'
  }

})
