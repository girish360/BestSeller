<?php

use server\services\cookie\cookie as cookie;

use server\db\DB as database;

use server\services\fetch\fetch as fetch;

use server\services\language\language as language;

use server\services\auth\auth as auth ;

class header {

    private $wishList = false;

    private $cartList = false;

    public function load_header(){ // must to get all data that needed in header ..............

        $language = json_decode( self::get_language() );

        $wishlist_cartlist = json_decode( self::get_wishlist_cartList() );

        if( auth::$user_details ){ // user exist ............................

            return fetch::json_data( array( 'client'=>auth::$user_details,'language'=>$language , 'wishlist_cartlist' => $wishlist_cartlist)) ;// return object with language  in frontend.........
        }

        return fetch::json_data( array( 'language'=>$language , 'wishlist_cartlist' => $wishlist_cartlist)) ;// return object with language  in frontend.........

    }

    public function get_language(){ // get language in object

        $language_in_coockie = cookie::check_cookie( 'language' ); //  call method check if have cookie  for language

        if( $language_in_coockie != false ){ // check if  exists cookie for language

            $objct_language = language::language( json_decode( $_COOKIE['language'] )); // call method to get language .......

            return fetch::json_data( $objct_language );// return object with language  in frontend.........

        }else{ // else if not exists cookie with language ..........

            $objct_language = language::language( '1' ); // call method to get language with default value  .......

            return fetch::json_data($objct_language );// return object with language  in frontend.........
        }
    }

    public function change_language( $new_language ){ // change language ....

        $objct_language = language::language( $new_language->language ); // call method to get language .......

        cookie::save_coockie( 'language', $new_language->language  ); //save language in cookie .............

        return fetch::json_data($objct_language );// return object with language  in frontend.......
    }

    public function get_wishlist_cartList(){

        $cookie_wishList = cookie::get_cookie( 'wishList'  );

        $cookie_cartList = cookie::get_cookie( 'cartList'  );

        if( $cookie_wishList != false ){

            $products_id = array();

            foreach ( $cookie_wishList as $key => $value ){

                array_push( $products_id , $value->id );
            }
            $this->wishList = database::table('products')
                ->select(
                    'products.id as product_id', 'products.title', 'products.image_id', 'products.category_id', 'products.price',
                    'products.quantity', 'products.image', 'products.created_at', 'products.in_cartList', 'products.in_wishList',
                    'suppliers.id as supplier_id', 'suppliers.name ', 'suppliers.image as supplier_image'
                )->join('suppliers','products.supplier_id','=','suppliers.id')
                ->whereIn('products.id' ,$products_id )
                ->get();
        }
        if( $cookie_cartList != false ){

            $product = array();

            foreach ( $cookie_cartList as $key => $value ){

                array_push( $product , $value->id );

            }

            $this->cartList = database::table('products')
                ->select(
                    'products.id as product_id', 'products.title', 'products.image_id', 'products.category_id', 'products.price',
                    'products.quantity', 'products.image', 'products.created_at', 'products.in_cartList', 'products.in_wishList',
                    'suppliers.id as supplier_id', 'suppliers.name ', 'suppliers.image as supplier_image'
                )->join('suppliers','products.supplier_id','=','suppliers.id')
                ->whereIn('products.id' ,$product )
                ->get();
        }
        if( $cookie_cartList != false || $cookie_wishList != false ){

            $result = array('wishList'=>$this->wishList ,'cartList'=> $this->cartList ,'quantity_items_incart'=>$cookie_cartList);

            return fetch::json_data(  $result ); // return json data ...........

        }
        return fetch::json_data(  false ); // return json data ...........
    }

    public function add_cart_cookie(  $data ){

        if( is_array($data) ){

            $result = cookie::save_coockie('cartList' , $data);

            return fetch::json_data(  $result );  // return result ......

        }

        $array_data = fetch::convert_to_array( $data );

        $result = cookie::save_coockie('cartList' , $array_data );

        return fetch::json_data( $result );  // return result ......

    }

    public function add_wish_cookie(  $data  ){

        if( is_array( $data ) ){


            $result = cookie::save_coockie('wishList' , $data);

            return fetch::json_data( $result );  // return result ......

        }

        $array_data = fetch::convert_to_array( $data );

        $result = cookie::save_coockie('wishList' , $array_data );

        return fetch::json_data( $data );  // return result ......

    }

    public function update_cartList(  $array_quantity ){

        if( is_array( $array_quantity ) ){

            $result = cookie::update_array( 'cartList',$array_quantity);

            return fetch::json_data(  $result );  // return result ......

        }

        $array_data = fetch::convert_to_array($array_quantity);

        $result = cookie::update_array( 'cartList',$array_data);

        return fetch::json_data( $result );  // return result ......

    }

    public function delete_from_wishlist( $array_selected ){

        $result = cookie::delete_items_in_Cookie('wishList',$array_selected );

        return fetch::json_data( $result );

    }

    public function delete_from_cartlist( $array_selected ){

        $result = cookie::delete_items_in_Cookie('cartList',$array_selected );

        return fetch::json_data( $result );

    }

}

?>