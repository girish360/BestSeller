<?php

if( $status =='products' ){ //  request for products from frontend ........



    echo $Object['Products']->getproducts( $data_from_client );

}

if( $status == 'add_wishProduct' ){ // request to add in wishList ........



     echo $Object['Cookie']->set_cookie( 'wishList' , $data_from_client );


}




?>