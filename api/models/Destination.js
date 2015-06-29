module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    }
  },

  findAll: function(){
    return Destination.find({});
  }

}
