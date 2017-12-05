<?php

if( $status == 'language' ){

    $lang = $_POST->value;

    $objct_language = $language->languages( $lang );

    echo json_encode($objct_language );
}



if( $status == 'delete_itemFromCookie' ){

    $value = $_POST->value;

    $delete_item = $cookie->delete_item_fromCookie( 'wishList' , $value );

    echo $fetch_data->json_data('delete_itemFromCookie' , $delete_item);

}
?>