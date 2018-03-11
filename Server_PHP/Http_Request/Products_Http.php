<?php

if( $status =='products' ){ //  request for products from frontend ........



    echo $Object['Products']->getproducts( $data_from_client );

}

if( $status == 'add_wishProduct' ){ // request to add in wishList ........



     echo $Object['Header']->add_wish_cookie($status,  $data_from_client );


}

if( $status == 'add_cartProduct' ){ // request to add in wishList ........



    echo $Object['Header']->add_cart_cookie( $status, $data_from_client );


}





?>