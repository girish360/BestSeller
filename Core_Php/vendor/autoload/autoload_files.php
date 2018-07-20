<?php


class autoload_files{

    private  $vendorDir;

    private  $baseDir;

    private  $directories;

    private  $path;

    public function __construct()
    {
        $this->vendorDir = dirname( dirname(__FILE__) );

        $this->baseDir =dirname( $this->vendorDir );

        $this->directories = array(

            'http' => $this->baseDir ,
            'controllers' => $this->baseDir,
            'controllers/clientControllers' => $this->baseDir ,
            'controllers/companyControllers'=> $this->baseDir,
            'services' => $this->baseDir,
            'database' => $this->baseDir,
            'autoload'=>$this->vendorDir
        );

    }

    public function checkfile( $filename ){

        foreach ( $this->directories as $key => $path ){

            $filepath = $path.'/'.$key.'/'.$filename.'.php' ;

            if( file_exists( $filepath ) ){

               $this->path = $filepath;

               break;

            }else{

                $this->path = false;
            }

        }

        return $this->path ;

    }


    public static function  classobject(){

        $class = __CLASS__;

        $classobject = new $class;

        return $classobject;
    }


}

?>