module.exports = {

  attributes: {

    // association
    user: {
      model: 'User',
      via: 'renterDetails'
    },


    dateOfBirth: {
      type: 'date'
    },
    occupation: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },

    // address
    address1: {
      type: 'string'
    },
    address2: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    zip: {
      type: 'string'
    }
  }
}

