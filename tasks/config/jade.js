
module.exports = function(grunt) {

  grunt.config.set('jade', {
    compile: {
      options: {
        client: true,
        namespace: 'snorlax.templates',
        data: {
          debug: false
        }
      },
      files: {
        ".tmp/public/js/templates.js": [
          "views/modules/**/*.jade",
          "views/mixins/**/*.jade",
          "views/partials/**/*.jade"
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
};
