<?php

if( $status =='auth'){

    $id = $_POST->value;

    $result = $auth_register->create_token($id);

    echo $fetch_data->json_data('auth',$result );

}

if( $status =='Register'){


}

if( $status =='user_email'){

    $email = $_POST->value;

    $result = $connection->select_query_dependet('users' , array("username"=>$email ,
        "email"=>$email) , array("first_name"=>"first_name","username"=>"username", "email"=>"email","local"=>"local","picture"=>"picture",)
    );

    if( $result ->rowCount() > 0 ){

        $array_data = $fetch_data->fetch_data_array( $result );

    }
    else{
        $array_data='false';
    }

    echo $fetch_data->json_data('auth',$array_data );


}


?>