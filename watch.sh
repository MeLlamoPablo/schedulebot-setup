#!/usr/bin/env bash

./node_modules/gulp/bin/gulp.js watch > gulp.log 2> gulp.err.log &
alias gplog="cat gulp.log gulp.err.log"
alias grm="rm gulp*.log"