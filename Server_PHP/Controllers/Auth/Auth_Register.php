<?php
require '../JWT.php';

use Firebase\JWT;

class Auth_Register  extends Firebase\JWT\JWT {

    private $secret_key_auth = '65757.,/[]Auth_Generate_Token_Engrypto_20568294816';

    private $Token_details = array();

    private $token;

    private $table_name ='users';



    public function check_email( $email_or_username ){

        $result = self::select_dependet_or( $this->table_name ,

            array("username"=>$email_or_username ,
            "email"=>$email_or_username) , array("first_name", "email", "picture")
        );

        if( $result ->rowCount() > 0 ){

            $array_data = self::fetch_data_array( $result );

        }
        else{

            $array_data='false';
        }

        return self::json_data('user_email',$array_data );
    }

    public function check_password( $object_data ){

        $array_data = self::convert_to_array( $object_data );

        $result = self::select_dependet_and( $this->table_name ,

            array( "password"=>$array_data['password'] , "email"=>$array_data['username'] ) ,
            array("id", "first_name", "last_name","username", "email","local","picture")
        );

        if( $result ->rowCount() > 0 ){

            $user_data = self::fetch_data_array( $result );

        }
        else{

            $user_data = 'false';
        }

        return self::json_data('user_loged', $user_data );

    }

    public function check_token(){

    }

    public function create_token( $id ){

        $this->Token_details['id'] = $id;

        $this->token = self::encode( $this->Token_details, $this->secret_key_auth );

        return $this->token;



    }

    public function id($token){

        $token = self::decode( $token, 'secret_server_key' );

        return $token->id;

    }

}



?>
