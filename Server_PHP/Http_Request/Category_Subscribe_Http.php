<?php

if(isset($_GET['get_category'])){

$category_subcategory = $category->get_category(); // call method get_category .....

echo json_encode( array( "status"=>"get_category",$category_subcategory) , JSON_FORCE_OBJECT ); // convert array to json

}
if(isset($_GET['cookie_menu'])){

$result = $cookie->set_cookie($_GET['cookie_menu']);

$json = $fetch_data->json_data($status = 'cookie_menu' , $array_data = $result); // status is to identify event ................
echo $json; // echo json response ..................................
}
if(isset($_GET['check_cookie_menu'])){

$result = $cookie->check_cookie($_GET['check_cookie_menu']);

$json = $fetch_data->json_data($status = 'cookie_menu' , $array_data = $result); // status is to identify event ................
echo $json; // echo json response ..................................

}

?>