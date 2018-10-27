<?php

namespace server\services\auth;

use Firebase\jwt\jwt as jwt;

use server\db\DB as database;

use server\services\fetch\fetch as fetch;

class auth {

    public static function check_client( $request ){

        $user_details = database::table('users')
            ->select('id','email', 'picture' ,'first_name','last_name','language')
            ->where('email','=',$request->username)
            ->andWhere('password','=',$request->password)
            ->get();

        if( empty($user_details) ){

            return fetch::json_data(false);

        }
        $token = self::set_token([
            "userid" => $user_details['id'],
            "email" => $user_details['email']
        ]);

        header('Authorization:'.$token.'');

        return fetch::json_data( $token );

    }

    public static function set_token( $user_data ){

        $passphrase = 'somestring';

        $key_private = openssl_get_privatekey( file_get_contents(__DIR__."/../config/private_key.pem" ), $passphrase );

        $issuedAt   = time();
        $notBefore  = $issuedAt + 10;             //Adding 10 seconds
        $expire     = $notBefore + 20*60;            // Adding 60 seconds
        $serverName = 'localhost:8080'; // Retrieve the server name from

        $token = array(
            "iss" => $serverName,
            "aud" => $serverName,
            "iat" => $issuedAt,
            "nbf" => $notBefore,
            "exp" => $expire,
            "token_type" => "bearer",
            "data" => $user_data
        );

        return $jwt = jwt::encode( $token, $key_private , 'RS256' );
    }

    public static function check_token( $token  ){

        $key_public = openssl_get_publickey( file_get_contents(__DIR__."/../config/public_key.pem" ) );

        jwt::$leeway = 60; // $leeway in seconds

        $decode_token = jwt::decode( $token, $key_public ,array('RS256'));

        return fetch::json_data ( $decode_token );


    }

    public static function check_auth( ){

        if( isset($_SERVER['HTTP_AUTHORIZATION']) ) {

            $token = $_SERVER['HTTP_AUTHORIZATION'];

            return self::check_token($token);
        }

        else

        header("HTTP/1.1 401 Unauthorized");

        echo 'error: Signature failed';

        exit;

    }

    // Function to get the client IP address
    public static function get_client_ip() {
        $ipaddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_X_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else if(isset($_SERVER['REMOTE_ADDR']))
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }




}

?>