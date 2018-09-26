<?php

namespace server\services\cookie;

class Cookie{


    public static function save_coockie( $cookie_name , $data_array ){

        try{
            setcookie( $cookie_name, '', time() - ((3600*60)*24)*30, '/' ); // remove cookie .......

            setcookie( $cookie_name , json_encode( $data_array ) , time() + ( (3600*60)*24)*30, '/'); // set cookie ..////////

            return true;

        }catch( Exception $e ){

            return false;
        }

    }

    public function remove_cookie( $name_cookie ){

        setcookie( $name_cookie, '', time() - ((3600*60)*24)*30, '/' ); // remove cookie .......

        return   true ;  // return result ......
    }

    public static function check_cookie( $name_cookie ){

        if( isset( $_COOKIE[$name_cookie] ) ){

            return true; // return result ......
        }
        else{
            return false ;  // return result ......
        }
    }

    public static function get_cookie( $cookie_name  ){

        if( isset($_COOKIE[$cookie_name]) ) {

            $array_data =  json_decode( $_COOKIE[$cookie_name] ) ;

            return $array_data;

        }
        else{

            return false;
        }
    }

    public function delete_items_in_Cookie( $cookie_name , $Array_selected ) // delete
    {
        try {
            if ( isset ( $_COOKIE[$cookie_name] ) ) { // check if exist this cookie .................

                $array_from_cookie = json_decode( $_COOKIE[$cookie_name] ); // take  array data from cookie stock .............

                if ( is_array( $array_from_cookie ) ) { // check if is array ...................

                    foreach ( $Array_selected as $key_in_selected  =>  $value_in_selected ) { // loop all id  that are in selected array ......

                        $nr = 0; //  start number from 0 for all id that are in selected array ......

                        foreach ( $array_from_cookie as $key_in_cookie => $value_in_cookie ){ // loop array id that are in wishlist ........

                            if( $value_in_selected == $value_in_cookie->id ){ // check  if  this value in selected  is  equals  wish one value in wish list

                                array_splice( $array_from_cookie , $nr,1 ); // remove item .....
                            }
                            $nr++; // ascending  number in variable ........
                        }
                    }
                    if( count( $array_from_cookie ) > 0 ){

                        $result = self::save_coockie( $cookie_name, $array_from_cookie ); // call methot to set cookie .....

                        return   $result ; // return result .....
                    }

                    return self::remove_cookie( $cookie_name ); // call methot to remove cookie .....
                }
                return false ; // return result .....

            }else {
                return  false ; // return result .....
            }

        }catch( Exception $e  ){

            return $e->getMessage();
        }
    }

    public function update_array( $cookie_name , $array_data ){

        try{

            $array_from_cookie = self::get_cookie($cookie_name);

            foreach ( $array_from_cookie as $array_key => $array_value ) {

                foreach ( $array_data as $key => $vlaue ) {

                    if ( $array_value->id == $vlaue->id ) {

                        $array_value->quantity = $vlaue->quantity;
                    }
                }
            }

            self::save_coockie($cookie_name, $array_from_cookie);

            return true;
        }
        catch( Exception $e ){

            return false;

        }

    }


}



?>
