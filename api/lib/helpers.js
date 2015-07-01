(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function () {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {

      // Converts THIS_CASE to This Case
      humanize: function(input) {
        var words = input.split('_');
        for (var i in words) {
          var word = words[i]
          // if its not an empty string
          words[i] = word.slice(0,1).toUpperCase() + word.slice(1).toLowerCase()

        }
        return words.join(' ')
      },

      // Returns an abbreviated version of the input. If it was shortened,
      // adds a '...'
      shorten: function(input, maxLength) {
        if (input && input.length > maxLength) {
          return input.slice(0, maxLength) + '...'
        }
        return input
      },

      // Returns a null-safe value for the object and given paths
      getNullSafeValue: function(object, paths) {
        if (!object) return object;

        var current = object;
        for (var i in paths) {
          if (!current[paths[i]]) {
            return current[paths[i]];
          }
          current = current[paths[i]]
        }
        return current;
      }

    };
}));
