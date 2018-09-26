<?php

use server\services\crypto\Crypto as crypto;

class Route{

    private static $number = 0;

    private static $params;  // params come from client ...........

    private static $httpMethod;  // method come from request ...........

    private static $uri;   // params come from request ...........

    private static $keyparams; // key to get params ...................

    private static $class; // controller's class name

    private static $method; // method of class

    private static $departament = false; // can set a departament of routes in a group ....

    private static $group = false; // can set a perfix of routes of a group ................

    private static $route = false; //  route inside a group

    private static $thisclass = __CLASS__;

    private static $routeExecuted = false;

    private static $stepsUrl;

    public static function get( $route , $action ){ // params come from Routes ...........

        if( self::$routeExecuted == false ) { // check is any from group is executed dont need to check more ......

            self::$route = $route;

            self::getMethod();

            if (self::$httpMethod == 'GET') {

                self::callController($action);

            } else if ($route == self::$uri) {

                self::exeption('Request Method come ' . self::$httpMethod . ' from client , it must be ' . self::$httpMethod . ' in Route ');

            }
        }
    }

    public static function post( $route , $action ){ // params come from Routes ...........

        if( self::$routeExecuted == false ) { // check is any from group is executed dont need to check more ......

            self::$route = $route;

            self::getMethod();  // get method request in server

            if ( self::$httpMethod == 'POST' ) { // check is method is same ........

                self::callController($action); // check uri

            } else if ($route == self::$uri) { // if uri is same and method  is different display error message

                self::exeption('Request Method come ' . self::$httpMethod . ' from client , it must be ' . self::$httpMethod . ' in Route '); // call methos for error
            }
        }
    }

    public static function department( $departament ){

        self::$departament = $departament;

        self::$number = 0;

        return self::instance();

    }

    public static function group( $group ){

        self::$group = $group;

        self::$number =1;

        return self::instance();

    }

    public function routes( $function ){ //  can check a group of routes .....................

       if( self::$routeExecuted == false ){ //  check if eny route is executed, if the route is founded don't need to check all routes ..........

           self::getMethod();

           if ( self::checkUrl() ){

               $function(); // execute function with group routes ..........
           }
       }
    }

    public static function finished(){

        if( self::$routeExecuted != true ){

            throw new Exception('this route does not exists');
        }

    }

    public static function instance(){

        return $instance = new self::$thisclass();
    }

    public static function getMethod(){

        self::$httpMethod = $_SERVER['REQUEST_METHOD'];
    }

    public static function check_params(){

        self::$uri = $_SERVER['REQUEST_URI'];

        if( self::$httpMethod =='GET' ) { // check if request method is GET

            if( strpos( self::$uri,'?' ) !== false ){ // check if in request type GET have params or not

                self::getParams(); // get params for this request ........

            }else{ // does not have params with get method only uri

                self::$params = false; // params equals with false ........
            }
        }
        else if( self::$httpMethod =='POST' ){ // check if request method is POST

            self::$params = file_get_contents("php://input"); // catch data from client with post request
        }

    }

    public static function getParams(){ // get params  of request that is send  in server only for get method

        $start = 0;

        $end = 0;

        for ( $i = 0 ; $i < strlen( self::$uri ) ; $i++ ){

            if( self::$uri[$i] == '?' ){

                $start = $i;

                continue;
            }
            if( self::$uri[$i] == '=' ){

                $end = $i;

                break;

            }
        }

        self::$keyparams  = substr( self::$uri , $start+1 ,$end-$start-1 );

        if( isset($_GET[ self::$keyparams ] ) ){

            self::$params = urldecode( $_GET[ self::$keyparams ] );

        }else{

            self::$params = false; // without params
        }

        self::$uri = substr(self::$uri ,0 ,$start);

    }

    public static function checkUrl(){

        self::check_params(); // check params, if have get them from request  ...........................

        $array_uri = explode('/', substr(self::$uri , 1 , strlen(self::$uri)));

        self::$stepsUrl = '';

        if( self::$number == 0 ){

            self::$stepsUrl = '/'.$array_uri[self::$number];

        }else{

            $i = 0;

            foreach ($array_uri as $key => $value ){

                if( $i <= self::$number ){

                    self::$stepsUrl .= '/'.$array_uri[$key];

                }else{

                    break;
                }
                $i++;
            }
        }

        self::$route = false;

        $routing = self::build_route();

        if( self::$stepsUrl == $routing ){ // url match  return true to execute a function

          return true;

        }else{

            return false;
        }

    }

    public static function build_route(){

            return self::$departament.self::$group.self::$route;

    }

    public static function callController(  $action ){

        if( self::$uri == self::build_route() ){ //  execute route ...................

            self::$routeExecuted = true;

            $nr = 0 ;

            for( $i = 0 ; $i < strlen( $action ) ; $i++ ){

                if( $action[$i] == '@' ){

                    $nr = $i;
                }
            }

            self::$class = substr( $action ,0 , $nr ); //get class of controller from routes................

            self::$method = substr( $action , $nr+1 , strlen( $action ) ); // get method from routes

            $func = array( new self::$class , self::$method ); // new object of controller ......................

            if( strlen( self::$params ) == 0 ) { // request without params

                echo $func();   // call method in specific controller and get result .....

            }else{ // request with params  call method in controller with param

                $params = self::decryptparams( self::$params );  // every params isencrypted  here in server shoud decrypted it

                if( !empty( $params ) ) {

                    echo $func( $params ) ;

                }else{

                }

            }
        }
    }

    public function decryptparams( $params ){

        $string = crypto::decrypt_in_server( $params );

        if( self::$httpMethod =='POST' ){

            $end_object=0;

            for( $i = 0 ; $i < strlen( $string ); $i++ ){ // loop string object
                if(  $string[$i] == ']' ){ // find end number string object...................
                    $end_object = $i; // end _String varibale equals with end number string object
                } // end if
            } // end loop

            $end_object = ++$end_object;

            return $params = json_decode( substr( $string , 0 , $end_object) );

        }else if( self::$httpMethod =='GET' ){

            $end_object=0;

            for( $i = 0 ; $i < strlen( $string ); $i++ ){ // loop string object
                if(  $string[$i] == '}' ){ // find end number string object...................
                    $end_object = $i; // end _String varibale equals with end number string object
                } // end if
            } // end loop

            $end_object = ++$end_object;

            return $params = json_decode( substr( $string , 0 , $end_object) );

        }else{
            return'';
        }
    }

    public function exeption( $sms ){

        throw new Exception(''.  $sms );

    }

    public static function n( ){

       echo self::$number++;

    }
}

?>