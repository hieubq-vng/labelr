import app from 'ampersand-app'
import Collection from 'ampersand-rest-collection'
import Repo from './repo'
import githubMixin from '../helper/github-mixin'

export default Collection.extend(githubMixin, {
  initialize () {
    setInterval(() => {
      if (app.me.token !== undefined) {
        this.fetch()
      }
    }, 5000) // 5 giay get lai 1 lan
  },

  url: 'https://api.github.com/user/repos',

  model: Repo,

  getByFullName (fullName) {
    let repo = this.findWhere({full_name: fullName})
    if (!repo) {
      repo = new Repo({full_name: fullName})
    }

    repo.fetch()

    return repo
  }
})
