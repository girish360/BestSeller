<?php

class Route {

    public static $params;  // params come from client ...........

    public static $httpMethod;  // method come from request ...........

    public static $uri;   // params come from request ...........

    public static $class; // controller's class name

    public static $method; // method of class


    public static function get( $uri , $action ){ // params come from Routes ...........

        self::getMethod();

        if( self::$httpMethod == 'GET' ){

            self::getURI();

            self::checkUri( $uri , $action );

        }
    }

    public static function post( $uri , $action ){ // params come from Routes ...........

        self::getMethod();

        if( self::$httpMethod == 'POST' ){

            self::getURI();

            self::checkUri( $uri ,$action );

        }
    }

    public static function getMethod(){

        self::$httpMethod = $_SERVER['REQUEST_METHOD'];
    }

    public static function getParams(){

        if( self::$httpMethod =='GET' ){

            self::$params = $_GET[ substr( self::$uri , 1 , strlen( self::$uri ) ) ];

        }

        if( self::$httpMethod =='POST'){

            self::$params = file_get_contents("php://input"); // catch data from client with post request
        }

    }

    public static function getURI(){ // get URI  of request that is send  in server

        if( self::$httpMethod =='POST' ){

           self::$uri = $_SERVER['REQUEST_URI'];
        }
        if( self::$httpMethod =='GET' ){

            $start = 0;

            $end = 0;

            $string = $_SERVER['REQUEST_URI'] ;

            for ( $i = 0 ; $i < strlen( $string ) ; $i++ ){

                if( $string[$i] =='?' ){

                    $start = $i;

                    continue;
                }
                if( $string[$i] =='='  ){

                    $end = $i;

                    break;
                }
            }

            $uri = substr( $string , $start+1 ,$end-2 );

            self::$uri = '/'.$uri;

        }

    }

    public static function checkUri( $uri , $action ){

        if( $uri == self::$uri ){ // yes this route is requested from client

             self::callController( $action );

        }else{

           // is not this route   nothing happend......................
        }

    }

    public static function callController( $action ){

         $nr = 0 ;

         for( $i = 0 ; $i < strlen( $action ) ; $i++ ){

             if( $action[$i] == '@' ){

                $nr = $i;
             }
         }

        self::$class = substr( $action ,0 , $nr ); //get class of controller from routes................

        self::$method = substr( $action , $nr+1 , strlen( $action ) ); // get method from routes

        $func = array( new self::$class , self::$method ); // new object of controller ......................

        self::getParams(); // get params from request ...................

        if( strlen( self::$params ) == 0 ) { // request without params

           echo $func();   // call method in specific controller and get result .....

        }else{ // request with params  call method in controller with param

            $params = self::decryptparams( self::$params );  // every params isencrypted  here in server shoud decrypted it

            if( count( $params ) == 1 ){

                $params = $params[0];
            }

            echo $func( $params );
        }

    }

    public function decryptparams( $params ){

        $crypto = new Crypto();

        $string_object = $crypto->decrypt_in_server( $params );

        $end_object=0;

        for( $i = 0 ; $i < strlen( $string_object ); $i++ ){ // loop string object
            if(  $string_object[$i] == ']' ){ // find end number string object...................
                $end_object = $i; // end _String varibale equals with end number string object
            } // end if
        } // end loop

        $end_object = ++$end_object;

        return $params = json_decode( substr( $string_object , 0 , $end_object) );
    }

    public function exeption(){

        throw new Exception('Some Error Message');

    }
}

?>