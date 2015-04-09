module.exports = function (grunt) {
	grunt.registerTask('build', [
		'compileAssets',
    // 'requirejs:compile',
		'clean:build',
		'copy:build'
	]);
};
