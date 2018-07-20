<?php

$baseDir = dirname( __FILE__);

require_once ( $baseDir . '/autoload/autoload_files.php' ); // require  autoload files class

class AutoLoaderClasses {

    public static function loadclass(){

        spl_autoload_register( function ( $class_name ) {

            $autoloadfiles = autoload_files::classobject();

            $filepath = $autoloadfiles->checkfile( $class_name );

            if( $filepath != false ){

                require $filepath;
            }
        });
    }
}

?>