import Model from 'ampersand-model'
import githubMixin from '../helper/github-mixin'

export default Model.extend(githubMixin, {
  url () {
    return 'https://api.github.com/repos/' + this.full_name
  },

  props: {
    id: 'number',
    name: 'string',
    full_name: 'string'
  },

  session: {

  },

  derived: {
    appUrl: {
      deps: ['full_name'],
      fn () {
        return '/repos/' + this.full_name
      }
    }
  }

})
