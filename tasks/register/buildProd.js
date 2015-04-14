module.exports = function (grunt) {
	grunt.registerTask('buildProd', [
		'compileAssets',
		'requirejs:compile',
    // 'concat',
		// 'uglify',
		// 'cssmin',
		'clean:build',
		'copy:build'
	]);
};
