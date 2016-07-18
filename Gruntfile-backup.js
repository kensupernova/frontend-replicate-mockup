module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            width: 800,
            suffix: '_large_1x',
            quality: 50
          },
          {
            width: 1500,
            suffix: '_large_2x',
            quality: 50
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/',
          dest: 'images/'
        }]
      }
    },
    sass: {
        dev:{
          src:'src/sass/style.scss',
          dest:'src/css/style.css'
        }
    },
    imagemin: {
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/',                   // Src matches are relative to this path
          src: ['images/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'dist/'                  // Destination path prefix
        }]
      }
    },
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dest/css',
          ext: '.min.css'
        }]
      }
    },
    concat: {
      dist:{
        src:'src/js/*.js',
        dest:'src/js/js-in-one.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'dest/js/js-in-one.min.js': ['src/js/*.js']
        }
      }
    },
    
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd:'src/',
          src: ['css/*.min.css', 'js/*.min.js','index.html'],
          dest: 'dist/',
          filter: 'isFile'
        }]
      },
    },
    watch: {
      css: {
        files:'src/sass/*.sass',
        tasks: ['sass'],
        options： {
          livereload: true,
        }
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
      },
      scripts: {
        files: ['**/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      }
    }
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // compress image, cs, js
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['responsive_images', 'sass', 'watch']);
  grunt.registerTask('dev', ['concat']);
  grunt.registerTask('dist', ['imagemin','uglify','cssmin','copy']);

};
