<?php

if( $status == 'language' ){ // on init from angular

    $lang = $_POST->value; // value language

    $language_in_coockie = $cookie->check_cookie( 'language' ); //  call method check if have cookie  for language

    if( $language_in_coockie != 'false' ){ // check if  exists cookie for language

        $objct_language = $language->languages( $_COOKIE['language'] ); // call method to get language .......

        echo $fetch_data->json_data('language' ,$objct_language);// return object with language  in frontend.........

    }else{ // else if not exists cookie with language ..........

        $objct_language = $language->languages( $lang ); // call method to get language .......

        echo $fetch_data->json_data('language' ,$objct_language);// return object with language  in frontend.........
    }

}

if( $status == 'changeLanguage' ){ // change lang  ......

    $lang = $_POST->value; // value that identify language

    $objct_language = $language->languages( $lang ); // call method to get language .......

    echo $fetch_data->json_data('language' ,$objct_language);// return object with language  in frontend.......

}

if( $status == 'delete_itemFromCookie' ){ // delete item from cookie

    $ArrayWish_Id_fromWishList = $_POST->value; // value that should delete ............

    $result = $cookie->delete_item_fromCookie( 'wishList' , $ArrayWish_Id_fromWishList ); // call method that do delete from cookie

    echo $fetch_data->json_data( 'delete_itemFromCookie' , $result ); // edho result .....

}
?>