<?php

header('Access-Control-Allow-Origin:*'); // access allow  for http .........................

include  '../connection_db/class_connection.php'; // include connection with database and  that have some method to access db ................

include '../Auth_Register_user/Auth_Register_user.php'; // include Auth_register_user  to  access their account .........................

include '../Category_Subscribe_and_Products/Category_Subscribe.php'; // include category and subscribe  ...................................

include  '../Session_Cookie/Cookies.php'; // include cookie class ............

if($_SERVER['REQUEST_METHOD']==='POST' ||  $_SERVER['REQUEST_METHOD']==='GET') { // chekc if request http is  GET or POST ...................

    // Auth users ...... http request post ang get .................................................................................................

    if (isset($_GET['email'])) {
        $email = $_GET['email'];
        $ema = $user->checkuse($email); // call method checkuse in  classlogin.php file  $user is object in this file class user .......
        if ($ema == '1') {
            echo $ema;
        } else {
            echo json_encode($ema);
        }
    }
    if (isset($_GET['pass'])) {
        $pass = mysql_real_escape_string($_GET['pass']);
        $respass = $user->chechkuserpass($pass);
        if ($respass == true) {
//header
        } else {
            echo $error = 1;
        }
    }
    if (isset($_GET['arraydatauser'])) {
        $array = explode(',', $_GET['arraydatauser']);
        $res = $user->registeruser($array);
        echo $res;


    }
    if (isset($_GET['checkemail'])) { // check email in databse if exsists  for company
        $array = $_GET['checkemail'];
        $res = $user->checkemail($array);
        if ($res == true) {
            echo 'true';
        } else {
            echo 'false';
        }


    }
    if (isset($_GET['password']) && isset($_GET['eemail'])) {
        $pass = mysql_real_escape_string($_GET['password']);
        $email = mysql_real_escape_string($_GET['eemail']);

        $respass = $user->checkpass($pass, $email);
        if ($respass == true) {

            echo 'true';

        }
        if ($respass == false) {
            echo 'false';
        }

    }


    if (isset($_GET['emailforget'])) {
        $email = $_GET['emailforget'];
        $res = $user->userforgetpassword($email);
        echo $res;

    }

    if (isset($_GET['key'])) {
        $arrayconf = $_GET['key'];

        $confirmi = $user->confirmaccount($arrayconf);

        if ($confirmi == true) {
            echo '1';
        }
        if ($confirmi == false) {
            echo '0';
        }

    }

    if (isset($_GET['getdatauser'])) {

        if (isset($_SESSION['datauser'])) {
            $data = $_SESSION['datauser'];

            echo $data['email'];
        }
    }

    if (isset($_GET['accbusinessstep1']) && isset($_GET['accbusinessstep2'])) {
        $arr1step1 = $_GET['accbusinessstep1']; // array with value step one in sing up bussiness account ....
        $arr2step2 = $_GET['accbusinessstep2']; // array with value step two in sing up bussoness account .....
        $resultati = $user->registeraccountbusiness($arr1step1, $arr2step2); // call the method  register in database this company .......
        echo $resultati;
    }

    if (isset($_GET['confirm']) && !empty($_GET['confirm']) && isset($_GET['array1'])) {
        $confirm_code = $_GET['confirm'];
        if ($confirm_code == 'confirmcode') {
            $email = $_GET['array1'];
            foreach ($email as $key => $value) {
                echo $value;
            }
            $res = $user->put_confirm_code($email['1']);

            if ($res == true) {
                echo 'ok';
            }

        }

    }

    // end Auth users ... http request ............................................................................................................

     // http request for  category and subscripe  ........... ..............................................................................

    if(isset($_GET['get_category'])){

        $category_subcategory = $category_obj->get_category(); // call method get_category .....

        echo json_encode( array( "status"=>"get_category",$category_subcategory) , JSON_FORCE_OBJECT ); // convert array to json

    }
    if(isset($_GET['cookie_menu'])){
        echo '1: "' . $cookie->set_cookie(false) . '" 2: "' . $cookie->set_cookie(false) . '"';

    }
    if(isset($_GET['check_cookie_menu'])){
       $res = $cookie->check_cookie($_GET['check_cookie_menu']);
        echo $res;
    }

    // end http request for  category and subscripe .............................................................................................
} // end if reequest_method post anf get ...................................................

?>