<?php

use server\services\auth\auth as auth ;

use server\services\fetch\fetch as fetch;

use server\services\error\error as error;

use server\db\DB as database;

class client_auth {

    private $token;

    private $refresh_token;

    public function login( $request ){

        if( isset($_SERVER['HTTP_X_SIGNATURE']) ) {

            auth::$x_signature = $_SERVER['HTTP_X_SIGNATURE'];

            $user_details = auth::check_credentials( $request );

            if( $user_details ){ // check if user exist........

                 self::generate_tokens();

                 header('X-Token:' .$this->token ); // set X_Token in response header .........

                 header('X-Refresh-Token:' .$this->refresh_token ); // set X_Token in response header .........

                 return fetch::json_data(auth::$user_details);

            } else { // response to client this user does not exist .....

                return fetch::json_data(false);
            }
        }else{

            error::header_error('401 Unauthorized' ); // brings a 401  status error and a message

            error::error('client signature failed'); // set error ........
        }
    }

    public function refresh_token(){

        try{

            auth::$x_refresh_token = $_SERVER['HTTP_X_REFRESH_TOKEN']; // get refresh token from request header .........

            auth::$x_signature = $_SERVER['HTTP_X_SIGNATURE']; // get signature from request header ......

            auth::check_refresh_token(); // check refresh token ...........

            self::generate_tokens();

            return fetch::json_data(array( 'new_token'=>$this->token, 'new_refresh_token'=> $this->refresh_token )); // return  new tokens .................
        }

        catch ( Exception $exception ){ // catch error .................

            error::header_error('401 Unauthorized'); // set status of error can not refresh token  .....

            database::table('users') // update token in db and uid of token ........
            ->update(['oauth_provider'=>null , 'oauth_uid'=> null ])
                ->where('id','=',auth::$user_details['id'])->execute();

            return $exception;

        }
    }

    public function generate_tokens(){

        $this->token = auth::generate_token( // call function to generate user's token for 30 minutes with details and browser's signature  .......
            [   // pass as paramerter user id and email in array ....
                "id" => auth::$user_details['id'],
                "email" => auth::$user_details['email']
            ]
            , auth::$x_signature // pass as parameter browser's signature .....
        ); //

        $this->refresh_token = auth::generate_refresh_token( // call function to generate user's refresh token for 1 month with details and browser's signature .......
            [   // pass as paramerter user id and email in array ....
                "id" => auth::$user_details['id'],
                "email" => auth::$user_details['email']
            ]
            , auth::$x_signature // pass as parameter browser's signature .....
        ); //

    }

}

?>
