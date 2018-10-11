<?php

use Firebase\jwt\jwt as jwt;

use server\db\DB as database;

define("SECRET_KEY", "Hello world.");

class Auth {

    private $secret_key_auth = '65757.,/[]Auth_Generate_Token_Engrypto_20568294816';

    private $Token_details = array();

    private $token;

    private $table_name ='users';


    public function check_user(  ){





    }

    public function set_token( ){

        echo time()+60*60 . '  >  ' . time()  ; echo '<br>';

        $key = "example_key";

        $expireTime = time()+20*60; // 50 + 50 > 60+60

        $token = array(

            "iss" => "http://example.org",
            "aud" => "http://example.com",
            "iat" => $expireTime,
            "nbf" => $expireTime,
            "data" => [
                "userID" => "1213",
                "username" => 'klodian'
            ]
        );

         echo $jwt = jwt::encode($token, SECRET_KEY );


        jwt::$leeway = 60; // $leeway in seconds

        print_r( $decoded = jwt::decode($jwt, SECRET_KEY, array('HS256') ) );

    }

    public static function check_token(){

        jwt::$leeway = 60; // $leeway in seconds

        $jwt ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9leGFtcGxlLm9yZyIsImF1ZCI6Imh0dHA6XC9cL2V4YW1wbGUuY29tIiwiaWF0IjoxNTM4MTQyNjEyLCJuYmYiOjE1MzgxNDI2MTIsImRhdGEiOnsidXNlcklEIjoiMTIxMyIsInVzZXJuYW1lIjoia2xvZGlhbiJ9fQ.ap1CvQvVcxlAQjY907Hoy6oQ4yYvGdhfBpUOkTYoK5M';

        $decoded = jwt::decode( $jwt, SECRET_KEY  , array('HS256') );

        print_r($decoded);

        echo 'ok';
    }



}



?>
