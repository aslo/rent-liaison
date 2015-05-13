/**
 * Optimize js assets
 */
module.exports = function(grunt) {

  grunt.config.set('requirejs', {
    compile: {
      options: {
        baseUrl: ".tmp/public/js",
        mainConfigFile: ".tmp/public/js/config.js",
        paths: {
          requireLib: './vendor/requirejs/require'
        },
        out: ".tmp/public/js/source.js",
        include: 'requireLib',
        optimize: 'uglify2',
        name: 'main',
        generateSourceMaps: false, // to speed up build times
        preserveLicenseComments: false,
        useStrict: true,
        wrap: true
      }
    }
  });

	grunt.loadNpmTasks('grunt-contrib-requirejs');
};
