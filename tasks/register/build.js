module.exports = function (grunt) {
	grunt.registerTask('build', [
		'compileAssets',
		'linkAssetsBuild',
    'requirejs:compile',
		'clean:build',
		'copy:build'
	]);
};
