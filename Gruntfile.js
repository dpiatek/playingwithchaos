module.exports = function(grunt) {

  // Config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      src: {
        files: ['coffee/**/*.coffee'],
        tasks: ['coffee'],
        options: {
          livereload: true
        }
      }
    },

    jshint: {
      src: [
        'js/**/*.js',
        'Gruntfile.js'
      ]
    },

    preprocess: {
      build: {
        src: 'index.html',
        options: {
          inline: true,
          context: {
            APP_DEV: false
          }
        }
      }
    },

    coffee: {
      options: {
        sourceMap: true
      },
      compile: {
        files: {
          'projects/sample/sample.js': ['coffee/main.coffee', 'coffee/sample.coffee'],
          'projects/sierpinski/sierpinski.js': ['coffee/main.coffee', 'coffee/sierpinski.coffee'],
          'projects/koch-curve/koch-curve.js': ['coffee/main.coffee', 'coffee/koch-curve.coffee']
        }
      }
    }

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Tasks
  grunt.registerTask('default', ['watch']);

};
