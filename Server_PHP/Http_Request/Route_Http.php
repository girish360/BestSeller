<?php
// access-control http request  in server is only from this domain name http://localhost:4200.........................
if($_SERVER['HTTP_ORIGIN'] == "http://localhost:4200") { // check is request are only from this domain name http://localhost:4200 , allow them to run .........
    header('Access-Control-Allow-Origin: http://localhost:4200'); // origin domain name only this http://localhost:4200...............
    header('Access-Control-Allow-Credentials: true'); // true credencials this is to send response with cookie .........
    header('Cache-Control: no-cache');
    header('Pragma: no-cache');
    header('Content-Type: text/plain');

}

include  '../connection_db/class_connection.php'; // include connection with database and that have some method to access db ................

include '../Fetch_Data/Fetch_Data.php'; // include fetch data file  ..............................

include '../Auth_Register_user/Auth_Register_user.php'; // include Auth_register_user  to  access their account .........................

include '../Category_Subscribe_and_Products/Category_Subscribe.php'; // include category and subscribe  ...................................

include '../Products/Products.php';  // include  products file .......................................

include  '../Session_Cookie/Cookies.php'; // include cookie class ............

include  '../Language/language.php'; // include language class..............



if($_SERVER['REQUEST_METHOD']==='POST' ||  $_SERVER['REQUEST_METHOD']==='GET') { // chekc if request http is  GET or POST ...................

    if( $_SERVER['REQUEST_METHOD']==='POST' ){ // check if request is POST ........

        $postdata = file_get_contents("php://input");

        $_POST = json_decode($postdata);

        $status = $_POST->status;

        // include products http request post ......
         include 'Products_Http.php';
        // end http request post........
        // include  Header http request post ...........
        include "Header_Http.php";
        // end
        if( $status =='get_wishList'){

            $wishList = $cookie->get_cookie_unserialize( 'wishList' ,'wishlist' );

            echo $fetch_data->json_data( 'get_wishList' , $wishList );
        }
        // include categrgory and sub htt request ..............
        if(  $status == 'category' ){

             $category_result = $connection->select_all('categorytype');

             $category_and_subcategory = $fetch_data->fetch_data_array_dependet($category_result,'allcategory_item','id_categorytype','id');

             echo $fetch_data->json_data('category', $category_and_subcategory );
        }
        //end




    }

    if( $_SERVER['REQUEST_METHOD']==='GET' ) { // check if request if Get

        // Auth users ...... http request post ang get .................................................................................................

        include 'Auth_Register_Http.php'; // include http request for users to login ang register .........

        // end Auth users ... http request ............................................................................................................

        // http request for  category and subscripe  ........... ..............................................................................

        include 'Category_Subscribe_Http.php';

        // end http request for  category and subscripe .............................................................................................
    }

} // end if reequest_method post anf get ...................................................


// request from angular .........................................................



?>