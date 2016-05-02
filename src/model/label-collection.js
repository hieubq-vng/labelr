import Collection from 'ampersand-rest-collection'

import Label from './label'

export default Collection.extend({
  url () {
    return this.parent.url() + '/labels'
  },

  model: Label

})
