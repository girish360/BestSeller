<?php

if($status =='products'){

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
if( $status == 'add_wishProduct' ){

     $all_products_inWish = $_POST->value;

     $result =  $cookie->set_cookie_serialize( 'wishList' , $all_products_inWish );

     echo $fetch_data->json_data('add_wishProduct',$result);
}
if( $status =='get_wishList'){

    $wishList = $cookie->get_cookie_unserialize( 'wishList' );

    echo $fetch_data->json_data( 'get_wishList' , $wishList );
}

?>