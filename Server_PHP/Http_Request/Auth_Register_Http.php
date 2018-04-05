<?php


if( $status =='Register' ){


}

if( $status =='check_email' ){



    echo  $Router['Auth_Register']->check_email($data_from_client);

}

if( $status =='check_password' ){



    echo $Router['Auth_Register']->check_password($data_from_client);

}

?>