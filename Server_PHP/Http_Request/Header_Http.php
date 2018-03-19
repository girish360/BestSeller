<?php

if( $status == 'language' ){ // on init from angular

    echo $Object['Language'] ->get_language( $data_from_client );

}

if( $status == 'changeLanguage' ){ // change lang  ......

    echo $Object['Language'] ->change_language( $data_from_client );

}

if( $status == 'delete_items_in_wish' ){ // delete item from cookie

    echo $Object['Cookie'] ->delete_items_in_Cookie( 'wishList' , $data_from_client ,$status ); // call method that do delete from cookie

}

if( $status == 'delete_items_in_cart' ){ // delete item from cookie

    echo $Object['Cookie'] ->delete_items_in_Cookie( 'cartList' , $data_from_client ,$status ); // call method that do delete from cookie

}

if( $status =='get_wishList_cartList'){

    echo $Object['Header']->get_wishlist_cartList();
}

if( $status == 'add_cartProducts' ){


    echo $Object['Header']->add_cart_cookie(  $status, $data_from_client );

}

if( $status == 'update_quantity_cartList' ){

    echo $Object['Header']->update_cartList( $status , $data_from_client );

}
?>