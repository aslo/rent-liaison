module.exports = {

  attributes: {
    property: {
      model: 'Property',
      via: 'externalListings'
    },

    url: {
      type: 'string',
      required: true,
      url: true
    }
  }

}
