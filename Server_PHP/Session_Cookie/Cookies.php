<?php



class Cookie extends Fetch_Data{

    public function set_cookie( $name_cookie , $value )
    {

        setcookie( $name_cookie , $value, time() + ((3600*60)*24)*30, '/'); // set cookie ..////////

        return array('set');


    }

    public function remove_cookie( $name_cookie ){

        setcookie( $name_cookie, '', time() - ((3600*60)*24)*30, '/' ); // remove cookie .......

        return array('remove');
    }

    public function check_cookie( $name_cookie ){

        if(isset($_COOKIE[$name_cookie]) && !empty( $_COOKIE[$name_cookie] ) ){

            return array('true');

        }
        else{

            return array('false');
        }
    }

    public function set_cookie_serialize( $cookie_name , $id_product ){

        try {
            $set_data = array( $id_product );

            if( isset( $_COOKIE[$cookie_name] ) ) {

                $data_exists = json_decode( $_COOKIE[$cookie_name] );

                if( is_array( $data_exists ) ) {

                    array_push( $data_exists, $id_product );

                    self::put_coockie_serialize( $cookie_name, $data_exists );

                    return 'true';
                }
                return 'false';

            } else {

                self::put_coockie_serialize( $cookie_name , $set_data );
                return array('true');

            }
        }catch( Exception $e ){

            return $e->getMessage();
        }

    }

    public function put_coockie_serialize( $cookie_name , $data_array ){


        setcookie( $cookie_name, '', time() - ((3600*60)*24)*30, '/' ); // remove cookie .......

        setcookie( $cookie_name , json_encode( $data_array ) , time() + ((3600*60)*24)*30, '/'); // set cookie ..////////


    }

    public function get_cookie_unserialize( $cookie_name , $status ){

        if( isset($_COOKIE[$cookie_name]) ) {

           $array_wishID_forWishList =  json_decode( $_COOKIE[$cookie_name] ) ;

           if( $status == 'wishlist' ){

               $wish_List = self::fetch_oneRow_dependet( $array_wishID_forWishList , 'products' , 'id' , 'adminat' ,'id' ,'id_admin');
           }
           if($status == 'cardlist'){

           }

            return  $wish_List;

        }else{

            return 'false';
        }
    }

    public function delete_item_fromCookie( $cookie_name , $value_which_you_want_to_delete ) // delete
    {
        try {

            if (isset ($_COOKIE[$cookie_name])) { // check if exist this cookie .................

                $array_from_cookie = json_decode( $_COOKIE[$cookie_name] ); // take  array data from cookie stock .............

                if ( is_array( $array_from_cookie ) ) { // check if is array ...................

                    foreach ( $array_from_cookie as $key => $value ) { // loop all array

                        if( $value == $value_which_you_want_to_delete ) { // find value in array .....
                            array_splice( $array_from_cookie , $key , 1); // delete this key from array ....
                        }
                    }

                    self::put_coockie_serialize( $cookie_name, $array_from_cookie ); // call methot to set cookie .....

                    return 'true'; // return true in frontend ........
                }
                return 'false'; // return false in frontend ........

            } else {
                return 'false'; // return false in frontend ........
            }

        }catch( Exception $e ){

            return $e->getMessage();
        }
    }


}

$cookie = new Cookie(); //  declare obj .....



?>
