<?php
// access-control http request  in server is only from this domain name http://localhost:8080.........................
if ( $_SERVER['HTTP_ORIGIN'] == "http://localhost:4200" ) { // check is request are only from this domain name http://localhost:4200 , allow them to run .........

    header('Access-Control-Allow-Origin: http://localhost:4200'); // origin domain name only this http://localhost:8080...............
    header('Access-Control-Allow-Credentials: true'); // true credencials this is to send response with cookie .........
    header('Cache-Control: no-cache');
    header('Pragma: no-cache');
    header('Content-Type: text/plain');

}

include '../Server_files/Server_files.php'; // include all controllers dynamically that are in Controllers directory ...


if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'GET') { // chekc if request http is  GET or POST ...................

    if ( $_SERVER['REQUEST_METHOD'] === 'POST' ) { // check if request is POST ........

        $postdata = file_get_contents("php://input"); // catch data from client.....................

        $crypto = new Crypto();

        $string_object = $crypto->decrypt_in_server( $postdata );

        $end_object=0;

        for( $i = 0 ; $i < strlen( $string_object ); $i++ ){ // loop string object

            if(  $string_object[$i] == '}' ){ // find end number string object...................

                $end_object = $i; // end _String varibale equals with end number string object

            } // end if

        } // end loop

        $end_object = ++$end_object;

        $_POST = json_decode( substr( $string_object , 0 , $end_object) );

        $status = $_POST->status; // status from client to identify  what should do server ...........

        $data_from_client = $_POST->value; // data from client json or only one variable dependet from request...

        // include products http request post ......
        require 'Products_Http.php';
        // end http request post........
        // include  Header http request post ...........
        include "Header_Http.php";
        // end

        require "Auth_Register_Http.php"; // include auth_register request ..........

        // include categrgory and sub htt request ..............

        require 'Category_Subscribe_Http.php';

        //end

        // request for home page that have categories with dependet products ........

        include  'Home_Http.php';

       // end
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET') { // check if request if Get

        // Auth users ...... http request post ang get .................................................................................................

        require 'Auth_Register_Http.php'; // include http request for users to login ang register .........

        // end Auth users ... http request ............................................................................................................

        // http request for  category and subscripe  ........... ..............................................................................

        require 'Category_Subscribe_Http.php';

        // end http request for  category and subscripe .............................................................................................
    }

} // end if reequest_method post anf get ...................................................

// request from angular .........................................................
?>