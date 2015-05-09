module.exports = {

  index: function (req, res, next) {
    Property.find({ user: req.user.id }, function(err, properties){
      res.view('modules/propertyowners/properties', {
        properties: properties
      });
    });
  },

  create: function (req, res, next) {
    var property = req.body;
    property.user = req.user;

    Property.create(property, function(err){
      if (err) return next(err)

      res.redirect('/properties')

    })
  },

  get: function(req, res, next) {
    Property.findOne({ slug: req.params.slug }, function(err, property){
      if(err) return next(err);

      res.json(property);
    })
  }
}
