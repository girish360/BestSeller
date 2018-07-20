<?php


class Header extends Cookie{

    public function get_wishlist_cartList(){

        $result_from_wishList = self::get_cookie( 'wishList'  );

        $result_from_cartList = self::get_cookie( 'cartList'  );

        $wishList_from_databse = [];

        $cartList_from_databse = [];

        if( $result_from_wishList != 'false' ){

            $select_and_tables = array(  // array with t6ables and respective columns

                //table
                "product"=>array(
                    // columns table
                    'product.id','product.title','product.image_id','product.category_id','product.price','product.quantity','product.unit_stock','product.image','product.date','product.in_cartList' ,'product.in_wishList'
                ),
                // table
                "company"=>array(
                    //colums table
                    'company.id','company.name','company.image'
                )
                // more table and columns ............
            );

            $wishList_from_databse = self::fetch_data_cookie( $select_and_tables, $result_from_wishList ); // ffetch data


        }
        if( $result_from_cartList != 'false' ){

            $select_and_tables = array(  // array with t6ables and respective columns

                //table
                "product"=>array(
                    // columns table
                    'product.id','product.title','product.image_id','product.category_id','product.price','product.quantity','product.unit_stock','product.image','product.date','product.in_cartList' ,'product.in_wishList'
                ),
                // table
                "company"=>array(
                    //colums table
                    'company.id','company.name','company.image'
                )
                // more table and columns ............
            );

            $cartList_from_databse = self::fetch_data_cookie( $select_and_tables, $result_from_cartList ); // ffetch data
        }

        if( $result_from_cartList != 'false' || $result_from_wishList != 'false' ){

            $result = array('wishList'=>$wishList_from_databse ,'cartList'=> $cartList_from_databse ,'cookie_cartList'=>$result_from_cartList);

            return self::json_data(  $result ); // return json data ...........
        }

        return self::json_data(  'false' ); // return json data ...........
    }

    public function  get_cartList(){


    }

    public function add_cart_cookie(  $data ){

        if( is_array($data) ){

            $result = self::save_coockie('cartList' , $data);

            return self::json_data(  $result );  // return result ......

        }

        $array_data = self::convert_to_array( $data );

        $result = self::save_coockie('cartList' , $array_data );

        return self::json_data(  $result );  // return result ......

    }

    public function add_wish_cookie(  $data  ){

        if( is_array( $data ) ){


            $result = self::save_coockie('wishList' , $data);

            return self::json_data( $result );  // return result ......

        }

        $array_data = self::convert_to_array( $data );

        $result = self::save_coockie('wishList' , $array_data );

        return self::json_data( $data );  // return result ......

    }
    public function update_cartList(  $array_quantity ){

        if( is_array( $array_quantity ) ){

            $result = self::update_array( 'cartList',$array_quantity);

            return self::json_data(  $result );  // return result ......

        }

        $array_data = self::convert_to_array($array_quantity);

        $result = self::update_array( 'cartList',$array_data);

        return self::json_data( $result );  // return result ......

    }



}

?>