<?php

use server\services\auth\auth as auth ;

class client_auth {

    public function check_client( $request ){

      return  auth::check_client($request);

    }

    public function set_token( $user_data ){

        return auth::set_token($user_data);

    }

    public  function check_token( $token  ){


    return auth::check_token($token);

    }



}

?>
