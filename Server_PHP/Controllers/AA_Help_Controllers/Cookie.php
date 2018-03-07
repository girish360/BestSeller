<?php

class Cookie extends Fetch_Data{


    public function set_cookie( $cookie_name , $id_product ){

        try {
            $set_data = array( $id_product );

            if( isset( $_COOKIE[$cookie_name] ) ) {

                $data_exists = json_decode( $_COOKIE[$cookie_name] );

                if( is_array( $data_exists ) ) {

                    array_push( $data_exists, $id_product );

                    self::save_coockie( $cookie_name, $data_exists );

                    return self::json_data('add_wishProduct' , 'true' );  // return result ......
                }
                return 'false';

            } else {

                self::save_coockie( $cookie_name , $set_data );

                return self::json_data('add_wishProduct' , 'true' );  // return result ......

            }
        }catch( Exception $e ){

            return $e->getMessage();
        }

    }

    public function save_coockie( $cookie_name , $data_array ){


        setcookie( $cookie_name, '', time() - ((3600*60)*24)*30, '/' ); // remove cookie .......

        setcookie( $cookie_name , json_encode( $data_array ) , time() + ( (3600*60)*24)*30, '/'); // set cookie ..////////


    }

    public function remove_cookie( $name_cookie ){

        setcookie( $name_cookie, '', time() - ((3600*60)*24)*30, '/' ); // remove cookie .......

        return self::json_data('remove_cookie' , 'true' );  // return result ......
    }

    public function check_cookie( $name_cookie ){

        if( isset( $_COOKIE[$name_cookie] ) ){

            return self::json_data('check_cookie' , 'true' );  // return result ......
        }
        else{
            return self::json_data('check_cookie' , 'false' );  // return result ......
        }
    }

    public function get_cookie( $cookie_name  ){

        if( isset($_COOKIE[$cookie_name]) ) {

           $array_id_inCookie =  json_decode( $_COOKIE[$cookie_name] ) ;

          return $array_id_inCookie;

        }
        else{

            return 'false';
        }
    }

    public function delete_item_InCookie( $cookie_name , $Array_selected ) // delete
    {
        try {
            if ( isset ( $_COOKIE[$cookie_name] ) ) { // check if exist this cookie .................

                $array_from_cookie = json_decode( $_COOKIE[$cookie_name] ); // take  array data from cookie stock .............

                if ( is_array( $array_from_cookie ) ) { // check if is array ...................

                    foreach ( $Array_selected as $key_in_selected  =>  $value_in_selected ) { // loop all id  that are in selected array ......

                        $nr = 0; //  start number from 0 for all id that are in selected array ......

                        foreach ( $array_from_cookie as $key_in_cookie => $value_in_cookie ){ // loop array id that are in wishlist ........

                            if( $value_in_selected == $value_in_cookie ){ // check  if  this value in selected  is  equals  wish one value in wish list

                                array_splice( $array_from_cookie , $nr,1 ); // remove item .....
                            }
                            $nr++; // ascending  number in variable ........
                        }
                    }
                    self::save_coockie( $cookie_name, $array_from_cookie ); // call methot to set cookie .....

                    return self::json_data( 'delete_itemFromCookie' , 'true' ); // return result .....
                }
                return self::json_data( 'delete_itemFromCookie' , 'false' ); // return result .....

            }else {
                return self::json_data( 'delete_itemFromCookie' , 'false' ); // return result .....
            }

        }catch( Exception $e  ){

            return $e->getMessage();
        }
    }


}



?>
