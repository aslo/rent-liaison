module.exports = function (grunt) {
	grunt.registerTask('default', ['compileAssets', 'linkAssets', 'requirejs:compile', 'watch']);
};
