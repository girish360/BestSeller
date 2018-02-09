<?php

if( $status =='products' ){ //  request for products from frontend ........

    $default='default';

    $start=0;

    $result_fromDB = $connection->select_all( $tabel='products' ); // get product from db .....


    $tb_name_dep = 'adminat';
    $column_dep='id';
    $id='id_admin';

    $res= $fetch_data->fetch_data_array_dependet( $result_fromDB , $tb_name_dep , $column_dep , $id );
    echo $fetch_data->json_data('products',$res);
}
if( $status == 'add_wishProduct' ){ // request to add in wishList ........

     $id_prod = $_POST->value; // value

     $result =  $cookie->set_cookie_serialize( 'wishList' , $id_prod ); //  call method that add one product  for wish list in cookie .....

     echo $fetch_data->json_data('add_wishProduct',$result);  // return result ......
}


?>