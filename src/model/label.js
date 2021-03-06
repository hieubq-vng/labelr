import app from 'ampersand-app'
import Model from 'ampersand-model'
import githubMixin from '../helper/github-mixin'
import xhr from 'xhr'

export default Model.extend(githubMixin, {
  idAttribute: 'name',
  // url () {
  //   return this.parent.url() + '/' + this.props.name
  // },

  props: {
    name: 'string',
    color: 'string'
  },

  session: {
    editing: {
      type: 'boolean',
      default: false
    },
    saved: {
      type: 'boolean',
      default: true
    }
  },

  isNew () {
    return !this.saved
  },

  update (attributes) {
    const oldAttributes = this.attributes
    xhr({
      url: this.url(),
      json: attributes,
      method: 'PATCH',
      headers: {
        Authorization: 'token ' + app.me.token
      }
    }, (err, req, body) => {
      if (err) {
        this.set(oldAttributes)
        console.log('error on updateting label')
      }
    })
    this.set(attributes)
  }
})
