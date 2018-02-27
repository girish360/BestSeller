<?php

if(isset($_GET['get_category'])){

    $category_subcategory = $Object['Category_Subscribe'] ->get_category(); // call method get_category .....

    echo json_encode( array( "status"=>"get_category",$category_subcategory) , JSON_FORCE_OBJECT ); // convert array to json

}

if(isset($_GET['cookie_menu_set'])){

    $result = $Object['Cookie'] ->set_cookie($_GET['cookie_menu_set'] , $value='menu_active');

    $json = $Object['Category_Subscribe'] ->json_data($status = 'cookie_menu' , $array_data = $result); // status is to identify event ................

    echo $json; // echo json response ..................................

}

if(isset($_GET['cookie_menu_remove'])){

    $result = $Object['Cookie'] ->remove_cookie( $_GET['cookie_menu_remove'] );

    $json = $fetch_data->json_data($status = 'cookie_menu' , $array_data = $result); // status is to identify event ................

    echo $json; // echo json response ..................................
}

if(isset($_GET['check_cookie_menu'])){

    $result = $Object['Cookie'] ->check_cookie($_GET['check_cookie_menu']);

    $json = $fetch_data->json_data($status = 'cookie_menu' , $array_data = $result); // status is to identify event ................

    echo $json; // echo json response ..................................

}

if(  $status == 'category' ){

   echo $Object['Category_Subscribe'] ->get_category();

}



?>