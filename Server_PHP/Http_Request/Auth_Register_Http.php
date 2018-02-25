<?php

if( $status =='auth' ){

    $id = $_POST->value;

    $result = $auth_register->create_token($id);

    echo $fetch_data->json_data('auth',$result );

}

if( $status =='Register' ){


}

if( $status =='check_email' ){

    $email_or_username = $_POST->value;


    echo $auth_register->check_email($email_or_username);

}

if( $status =='check_password' ){

    $object_data = $_POST->value;

    echo $auth_register->check_password($object_data);


}



?>