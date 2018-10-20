<?php

$vendorDir = dirname( __FILE__);

$baseDir = dirname( $vendorDir );

require_once($vendorDir . '/autoload/autoload_files.php'); // require  autoload files class


class AutoLoaderClasses {

    public static function loadclass(){

        spl_autoload_register( function ( $class_name ) {

            $autoloadfiles = autoload_files::classobject();

            $exp_class = explode('\\', strtolower( $class_name ) );

            $class = array_pop( $exp_class );

            $filepath = $autoloadfiles->checkfile( $class );

            if( $filepath != false ){

                require $filepath;

            }
        });
    }
}

?>