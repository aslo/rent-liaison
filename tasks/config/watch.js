/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-watch
 *
 */
module.exports = function(grunt) {

	grunt.config.set('watch', {
		api: {
			files: ['api/**/*', '!**/node_modules/**']
		},

    assets: {
			files: ['assets/**/*', '!assets/js/vendor/**', 'tasks/pipeline.js', '!**/node_modules/**'],
			tasks: ['syncAssets' , 'linkAssets']
		},

    views: {
      files: ['views/**/*.jade'],
      tasks: ['jade']
    }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};
