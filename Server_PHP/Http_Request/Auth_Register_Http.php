<?php

if( $status =='auth'){

    $id = $_POST->value;

    $result = $auth_register->create_token($id);

    echo $fetch_data->json_data('auth',$result );

}

if( $status =='Register'){


}

if( $status =='Forget_password'){


}






?>