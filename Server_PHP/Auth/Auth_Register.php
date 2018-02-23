<?php

include "JWT.php";

class Auth_Register  extends \Firebase\JWT\JWT {

    private $secret_key_auth = 'Auth_Generate_Token_Engrypto_20568294816';

    private $Token_details = array();

    private $token;

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

$auth_register = new Auth_Register;

?>
