module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // compress image, cs, js
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            name:"small",
            width: 500,
            // suffix: '-small',
            quality: 50
          },
          {
            name:"medium",
            width: 800,
            // suffix: '-medium',
            quality: 50
          },
          {
            name:"large",
            width: 1500,
            // suffix: '-large',
            quality: 50
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}', '!udacity-logo.jpg'],
          // src: ['udacity-logo.jpg'],
          cwd: 'src/images_src/',
          dest: 'src/images/'
        }]
      }
    },
    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
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
      },
      // png: {
      //   options: {
      //     optimizationLevel: 7
      //   },
      //   files: [
      //     {
      //       // Set to true to enable the following options…
      //       expand: true,
      //       // cwd is 'current working directory'
      //       cwd: 'src/images/',
      //       src: ['*.png'],
      //       // Could also match cwd line above. i.e. project-directory/img/
      //       dest: 'dest/images/',
      //       ext: '.png'
      //     }
      //   ]
      // },
      // jpg: {
      //   options: {
      //     progressive: true
      //   },
      //   files: [
      //     {
      //       // Set to true to enable the following options…
      //       expand: true,
      //       // cwd is 'current working directory'
      //       cwd: 'src/images/',
      //       src: ['*.jpg'],
      //       // Could also match cwd. i.e. project-directory/img/
      //       dest: 'dest/images/',
      //       ext: '.jpg'
      //     }
      //   ]
      // }
    },
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.css'
        }]
      }
    },
    concat: {
      dist:{
        src:'src/js/*.js',
        dest:'dist/js/js-in-one.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/js/mainpage.js': ['src/js/mainpage.js', '*.min.js']
        }
      }
    },
    
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd:'src/',
          src: ['css/*.min.css', 'js/*.min.js','index.html', 'images/*'],
          dest: 'dist/',
          filter: 'isFile'
        }]
      },
    },
    watch: {
      css: {
        files:'src/sass/*.sass',
        tasks: ['sass'],
        options: {
          livereload: true,
        },
      }
    }
  });

  grunt.registerTask('images', ['responsive_images']);
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('dev', ['watch']);
  // grunt.registerTask('dist', ['image_min','concat','uglify','cssmin','copy']);
  grunt.registerTask('dist', ['uglify','cssmin','copy']);

};
