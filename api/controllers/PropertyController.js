module.exports = {

  index: function (req, res, next) {
    Property.find({ user: req.user.id })
    .sort({ createdAt: 'DESC' })
    .exec(function(err, properties){
      res.view('modules/propertyowners/properties', {
        properties: properties
      });
    });
  },

  create: function (req, res, next) {
    var property = req.body;
    property.user = req.user;

    Property.create(property, function(err, result){
      if (err) return next(err)
      res.json(result);
    })
  },

  get: function(req, res, next) {
    Property.findOne({ slug: req.params.slug }, function(err, property){
      if(err) return next(err);
      res.view('modules/property/property', {
        property: property
      });
    })
  }
}
