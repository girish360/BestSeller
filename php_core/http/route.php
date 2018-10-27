<?php

use server\services\crypto\crypto as crypto;

use server\services\auth\auth as auth;

class route{

    private static $number = 0;

    private static $params;  // params come from client ...........

    private static $httpMethod;  // method come from request ...........

    private static $httpRouterMethod;

    private static $uri;   // params come from request ...........

    private static $keyparams; // key to get params ...................

    private static $class; // controller's class name

    private static $method; // method of class

    private static $action;

    private static $departament = false; // can set a departament of routes in a group ....

    private static $group = false; // can set a perfix of routes of a group ................

    private static $route = false; //  route inside a group

    private static $thisclass = __CLASS__;

    private static $routeExecuted = false;

    private static $stepsUrl;

    private static $user_details;

    private static $required_auth = false;

    public static function get( $route , $action ){ // params come from Routes ...........

        self::$required_auth = false;

        self::$action = $action;

        self::$route = $route;

        self::$httpRouterMethod ='GET';

        return self::instance();
    }

    public static function post( $route , $action ){ // params come from Routes ...........

        self::$required_auth = false;

        self::$route = $route;

        self::$action = $action;

        self::$httpRouterMethod ='POST';

        return self::instance();
    }

    public function exe(){

        if( self::$routeExecuted == false ) { // check is any from group is executed dont need to check more ......

            self::getMethod();  // get method request in server

            if ( self::$httpMethod == self::$httpRouterMethod ) {

                if( self::$uri == self::build_route() ) { // if is  exactly this route required execute it ...................

                    if( self::$required_auth == true ){ // check if in this route required authetification ...

                        self::$user_details = auth::check_auth();  // if is authetification is failed brings a error and exit with header 401 unauthorization

                    }

                    self::call_controller(self::$action);
                }

            } else if (self::$route == self::$uri){

                self::exeption('Request Method come ' . self::$httpMethod . ' from client , it must be ' . self::$httpMethod . ' in route ');

            }
        }

    }

    public static function auth(){ //  requiared authetification to access specific route ...............

        self::$required_auth = true;

        return self::instance();

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

           echo ' Error this route is not provide in routes.php file';

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

            if( empty( $array_uri[self::$number] ) ){

                self::$stepsUrl = $array_uri[self::$number];

            }else{

                self::$stepsUrl = '/'.$array_uri[self::$number];
            }

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

    public static function call_controller(  $action ){

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

            if( json_decode(self::$params) ){

                echo $func( json_decode(self::$params) ) ;

            }else{

                echo $func( self::$params ) ;
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

}

?>