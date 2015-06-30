module.exports = {

  // Converts THIS_CASE to This Case
  humanize: function(input) {
    var words = input.split('_');
    for (var i in words) {
      words[i] = words[i].toLowerCase()
      words[i][0] = words[i].charAt(0).toUpperCase()
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
  }

}
