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

            'Http' => $this->baseDir ,
            'Controllers' => $this->baseDir,
            'Controllers/clientControllers' => $this->baseDir ,
            'Controllers/companyControllers'=> $this->baseDir,
            'Services' => $this->baseDir,
            'Database' => $this->baseDir,
            'Autoload'=>$this->vendorDir
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