#!/bin/bash

template_path=`dirname $0`/./closure-templates;

java -jar $template_path/SoyToPhpSrcCompiler.jar \
    --outputPathFormat '{INPUT_DIRECTORY}/{INPUT_FILE_NAME_NO_EXT}.php' \
    $* 

