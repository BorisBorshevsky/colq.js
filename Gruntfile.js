module.exports = function (grunt) {
	
	grunt.initConfig({
		ts: {
			debug: {
				options: {
					sourceMap: false,
					fast: 'never',
					module: 'amd'
				},
				out: 'debug/Col.js',
				src: ['Col.ts']
			},
			debug_test: {
				options: {
					sourceMap: false,
					fast: 'never'
				},
				files: [
					{src: 'test/Col.ts', dest: 'debug/test/Col.js'}
				]
			},
			release: {
				options: {
					sourceMap: false,
					fast: 'never'
				},
				out: 'release/Col.js',
				src: ['Col.ts']
			},
			release_test: {
				options: {
					sourceMap: false,
					fast: 'never'
				},
				files: [
					{src: 'test/Col.ts', dest: 'release/test/Col.js'}
				]
			},
		},
		clean: {
			release: ['release'],
			debug: ['debug']
		},
		concat: {
			debug: {
				src: [
					'helpers/start.js',
					'debug/Col.js',
					'helpers/end.js'
				],
				dest: 'debug/Col.js'
			},
			release: {
				src: [
					'helpers/start.js',
					'release/Col.js',
					'helpers/end.js'
				],
				dest: 'release/Col.js'
			}
		},
		uglify: {
			release: {
				options: {
					sourceMap: true
				},
				files: {
					'release/Col.min.js': 'release/Col.js'
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('build', ['clean:debug', 'ts:debug', 'concat:debug', 'ts:debug_test']);
	grunt.registerTask('release', ['clean:release', 'ts:release', 'concat:release', 'uglify:release', 'ts:release_test']);
	
};