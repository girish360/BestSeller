<?php

if( $status =='products' ){ //  request for products from frontend ........


    echo $Router['Products']->getproducts( $data_from_client );

}

if( $status == 'add_wishProduct' ){ // request to add in wishList ........



     echo $Router['Header']->add_wish_cookie($status,  $data_from_client );


}

if( $status == 'add_cartProduct' ){ // request to add in wishList ........


    echo $Router['Header']->add_cart_cookie( $status, $data_from_client );

}

if( $status == 'product_details' ){ // request to add in wishList ........

    $decrypted = $Router['Crypto']->decrypt_in_server($data_from_client);

    echo $Router['Products']->get_product_details( $status ,  $decrypted);

}

?>