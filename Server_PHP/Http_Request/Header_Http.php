<?php

if( $status == 'language' ){ // on init from angular

    echo $Object['Language'] ->get_language( $data_from_client );

}

if( $status == 'changeLanguage' ){ // change lang  ......

    echo $Object['Language'] ->change_language( $data_from_client );

}

if( $status == 'delete_itemFromCookie' ){ // delete item from cookie

    echo $Object['Cookie'] ->delete_item_InCookie( 'wishList' , $data_from_client ); // call method that do delete from cookie

}

if( $status =='get_wishList'){

    echo $Object['Header']->get_wishlist();
}

if( $status == 'add_cartProducts' ){


    echo $Object['Header']->add_in_cart( $data_from_client );

}
?>