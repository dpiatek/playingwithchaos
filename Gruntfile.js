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
      compile: {
        files: {
          'js/main.js': ['coffee/main.coffee', 'coffee/sample.coffee']
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
