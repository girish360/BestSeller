<?php

if( $status == 'language' ){ // on init from angular

    $lang = $_POST->value; // value language

    $language_in_coockie = $cookie->check_cookie( 'language' ); //  call method check if have cookie  for language

    if( $language_in_coockie != false ){ // check if  exists cookie for language

        $objct_language = $language->languages( $_COOKIE['language'] ); // call method to get language with value from cookie .....

        echo json_encode( $objct_language ); // return object  in frontend with language ......

    }else{ // else if not exists cookie with language ..........

        $objct_language = $language->languages( $lang ); // call method  with default language from system ...

        echo json_encode( $objct_language ); // return object with language default .................
    }

}

if( $status == 'changeLanguage' ){ // change lang  ......

    $lang = $_POST->value; // value that identify language

    $objct_language = $language->languages( $lang ); // call method to get language .......

    echo json_encode( $objct_language ); // return object with language  in frontend.........

}

if( $status == 'delete_itemFromCookie' ){ // delete item from cookie

    $value = $_POST->value; // value that should delete ............

    $delete_item = $cookie->delete_item_fromCookie( 'wishList' , $value ); // call method that do delete from cookie

    echo $fetch_data->json_data('delete_itemFromCookie' , $delete_item); // edho result .....

}
?>