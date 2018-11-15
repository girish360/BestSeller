<?php

namespace server\services\auth;

use Firebase\jwt\jwt as jwt;

use server\db\DB as database;

use server\services\fetch\fetch as fetch;

use server\services\error\error as error;

use Exception;

class auth {

    public static $user_details = false; // kept user details ,

    public  static $x_token = false; // token of client  kept user's  details , epiration time , client_signature etc...

    public static $x_signature = false; //this is client signature that come  over each request when user is login or when  send credencials to login

    public static $x_refresh_token = false;

    public static function check_credentials( $request  ){

        $user_details = database::table('users') // query to get from db specific user dependet from their credentials....
            ->select('id','email', 'picture' ,'first_name','last_name','language','password')
            ->where('email','=',$request->email)
            ->orWhere('phone','=',$request->email)
            ->get();

        if( $user_details ){ // user does not exists in db return false  ........
            self::$user_details = $user_details[0];

            if( self::$user_details['password']  == $request->password ){ // if and password is same return true

                 unset( self::$user_details['password'] ); // remove password from user's details ...

                return true; // return successful

            }
            // incorrect password ............
            error::header_error('401 Unauthorized'); // 401 error password is incorrect

            error::error('Email is incorrect'); // throw exeption message .......

            exit; // exit request .............
        }
        // email is incorrect
        error::header_error('404 Email not founded '); // 401 error email is incorrect

        error::error('Password is incorrect'); // throw exeption message .......

        exit; // exit request .............


    }

    public static function register( $request ){


        if( !empty($request->firstName)  && !empty($request->lastName) && !empty($request->email) && !empty($request->passwordGroup->password) && !empty($request->passwordGroup->confirmPassword) ){

            if( $request->passwordGroup->password === $request->passwordGroup->confirmPassword ){

                $user = database::table('users') // query to get from db specific user dependet from their credentials....
                ->select('id','email', 'picture' ,'first_name','last_name','language')
                    ->where('email','=',$request->email)
                    ->orWhere('phone','=',$request->email)
                    ->get();

                if( !$user ){  // this user does not exists go ahead create a new account ....................................

                      database::table('users')
                          ->insert(
                              [
                                  'first_name'=>$request->firstName,
                                  'last_name'=>$request->lastName,
                                  'email'=>$request->email,
                                  'password'=>$request->passwordGroup->password
                              ]
                          );

                      auth::$user_details = array( 'id'=> database::$lastid , 'email'=> $request->email, 'first_name'=>$request->firstName ,'last_name'=> $request->lastName ,'picture'=>null , 'language'=>null  );

                      return true;

                }
                //this email is exists ask if forgot password ........

                error::header_error('403 Email exist');

                error::error('Email already exists');

                exit;
            }

            error::header_error('400 Confirm password');

            error::error('Confirm password does not much with password');

            exit;

        }
        error::header_error('400 invalid data');

        error::error('must come all data that are required to create a account');

        exit;

    }

    public static function generate_token( $user_data , $browser_signature ){

        $private_key = openssl_get_privatekey( file_get_contents(__DIR__."/../config/private_key.pem" ) ); // get private_ket
        $issuedAt   = time(); // get time
        $notBefore  = $issuedAt + 10;             //Adding 10 seconds
        $expire     = $issuedAt + 15*60;            // add 15 minutes to access token ....
        $serverName = 'localhost:8080'; // domain name

        $token_details = array( // generate array with token details ..........
            "iss" => $serverName,
            "aud" => $browser_signature,
            "iat" => $issuedAt,
            "nbf" => $notBefore,
            "exp" => $expire,
            "token_type" => "bearer",
            "data" => $user_data
        );

        $jwt = jwt::encode( $token_details, $private_key , 'RS256' ); // generate token and return it ......

        database::table('users') // update token in db and uid of token ........
            ->update(['oauth_provider'=>$jwt , 'oauth_uid'=> $browser_signature ])
            ->where('id','=',$user_data['id'])->execute();

        return $jwt   ; // return

    }

    public static function generate_refresh_token( $user_data , $browser_signature ){

        $hour = 60*60;

        $day = $hour*24;

        $month = $day*30;

        $key_private = openssl_get_privatekey( file_get_contents(__DIR__."/../config/private_key.pem" ));
        $issuedAt   = time(); // time
        $notBefore  = $issuedAt + 10;             //Adding 10 seconds
        $expire     = $issuedAt + $month;  //  expire time of refresh token if user's does not open their account within one moth their refresh token will expire
        $serverName = 'localhost:8080'; // Retrieve the server name from

        $token = array(
            "iss" => $serverName,
            "aud" => $browser_signature,
            "iat" => $issuedAt,
            "nbf" => $notBefore,
            "exp" => $expire,
            "data" => $user_data
        );

        return jwt::encode( $token, $key_private , 'RS256' );

    }

    public static function check_token(){

        try { // try some code .......

            $key_public = openssl_get_publickey(file_get_contents(__DIR__ . "/../config/public_key.pem"));

            jwt::$leeway = 60; // $leeway in seconds

            $decode_token = jwt::decode(self::$x_token, $key_public, array('RS256'));

            $client = database::table('users')
                ->select('id', 'oauth_provider', 'oauth_uid', 'first_name', 'last_name', 'picture','email','username','language','phone')
                ->where('id', '=', $decode_token->data->id)
                ->get();

            if ( count($client) == 1 ) { // only one row
                self::$user_details = $client[0]; // get user details .............
            } else if (count($client) == 0) { // does not exists user in db with id that is in X_token ....
                self::$user_details = false;
            } else { // query have find more than 1 row
                self::$user_details = false; //  never shouldn't have duplicate id in users table
            }


            if ( self::$user_details['oauth_uid'] != self::$x_signature && self::$user_details['oauth_provider'] != self::$x_token  ) { // valid  refresh token ..........

                self::$user_details = false;

                throw new Exception('client signature dose not match');

            }else{

                unset(self::$user_details['oauth_provider']); // remove token from user details it needed just to match with token that is come from client

                unset(self::$user_details['oauth_uid']); // remove client id from user details it needed just to match  singnature that come from client .....
            }
        }
        catch ( Exception $exception ){ // catch any error ...............

            error::header_error('401 Unauthorized'); // brings a 401  status error and a message

            echo $exception;

            exit;

        }

    }

    public static function check_refresh_token(){


            $key_public = openssl_get_publickey(file_get_contents(__DIR__ . "/../config/public_key.pem"));

            jwt::$leeway = 60; // $leeway in seconds

            $decode_refresh_token = jwt::decode( self::$x_refresh_token, $key_public, array('RS256') );

            $client = database::table('users')
                ->select('id', 'oauth_provider', 'oauth_uid', 'first_name', 'last_name', 'picture' ,'email')
                ->where('id', '=', $decode_refresh_token->data->id)
                ->get();

            if (count($client) == 1) { // only one row
                self::$user_details = $client[0]; // get user details .............
            } else if (count($client) == 0) { // does not exists user in db with id that is in X_token ....
                self::$user_details = false;
            } else { // query have find more than 1 row
                self::$user_details = $client; //  never shouldn't have duplicate id in users table
            }



        if ( self::$user_details['oauth_uid'] != self::$x_signature  ) { // valid token ..........

            throw new Exception('Client signature failed');

        }  // does not match signature that is in db with it in request  or token that is in db with it in request ...........
    }

    public static function check_auth(){

        if( isset($_SERVER['HTTP_X_TOKEN']) && isset($_SERVER['HTTP_X_SIGNATURE'] ) ) {

            self::$x_token = $_SERVER['HTTP_X_TOKEN'] ;

            self::$x_signature = $_SERVER['HTTP_X_SIGNATURE'];

            return true;
        }

        else return false;

    }

}

?>