<?php

if( $status =='products' ){ //  request for products from frontend ........

    $object_details = $_POST->value;

    $array_data = $fetch_data->convert_to_array( $object_details );

    $result = $products->getproducts( $array_data );

    echo $fetch_data->json_data('products',$result );


}
if( $status == 'add_wishProduct' ){ // request to add in wishList ........

     $id_prod = $_POST->value; // value

     $result =  $cookie->set_cookie_serialize( 'wishList' , $id_prod ); //  call method that add one product  for wish list in cookie .....

     echo $fetch_data->json_data('add_wishProduct',$result);  // return result ......
}


?>