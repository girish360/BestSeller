<?php


class Header extends Cookie {


    public function get_wishlist(){

        $wishList = self::get_cookie_unserialize( 'wishList' ,'wishlist' );

        return self::json_data( 'get_wishList' , $wishList );
    }

}

?>