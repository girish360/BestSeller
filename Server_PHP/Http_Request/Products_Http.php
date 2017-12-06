<?php

if( $status =='products' ){ //  request for products from frontend ........

    $default='default';

    $start=0;

    $result_fromDB = $connection->select_all( $tabel='products' ); // get product from db .....

    if($result_fromDB->num_rows > 6){

        $number_total = $result_fromDB->num_rows;
        $i=0;
        $limit = $products->getpages($number_total, $i);
        $all_number_pages = $products->total_pages;
        $link = $products->getpage_link($all_number_pages, $i , $default);

    }else{

        $limit=$result_fromDB;
        $link = '';
    }
    $tb_name_dep = 'adminat';
    $column_dep='id';
    $id='id_admin';

    $res= $fetch_data->fetch_data_array_dependet( $limit , $tb_name_dep , $column_dep , $id );
    echo $fetch_data->json_data('products',$res);
}
if( $status == 'add_wishProduct' ){ // request to add in wishList ........

     $id_prod = $_POST->value; // value

     $result =  $cookie->set_cookie_serialize( 'wishList' , $id_prod ); //  call method that add one product  for wish list in cookie .....

     echo $fetch_data->json_data('add_wishProduct',$result);  // return result ......
}


?>