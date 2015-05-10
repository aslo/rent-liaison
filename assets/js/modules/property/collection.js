define([
  'backbone',
  'modules/property/model'
], function(Backbone, Property){

  return Backbone.Collection.extend({
    url: '/property',

    model: Property

  })
})
