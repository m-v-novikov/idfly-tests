module.exports = function(grunt){
    grunt.initConfig({
        slim: {                              // Task
            dist: {                            // Target
                files: {                         // Dictionary of files
                    './html/index1.html': './slim/index1.slim',
                    './html/index2.html': './slim/index2.slim'
                }
            }
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    './css/main.css': './sass/index1/main.scss',       // 'destination': 'source'
                    './css/common.css': './sass/index2/common.scss'
                }
            }
        },
        watch: {
            files: ['**/**/*.scss', '**/**/*.slim'],
            tasks: ['slim', 'sass']
            //slim: {
            //    files: ['./**/*.slim'],
            //    tasks: ['slim'],
            //    options: {
            //
            //    }
            //},
            //sass: {
            //    files: ['./**/**/*.sass'],
            //    tasks: ['sass'],
            //    options: {
            //
            //    }
            //}
        }
    });

    grunt.loadNpmTasks('grunt-slim');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['slim', 'sass', 'watch']);
}