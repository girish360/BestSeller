<?php


class Header extends Cookie {

    public function get_wishlist(){

        $array_id_wish_in_cookie = self::get_cookie( 'wishList'  );

        $select_and_tables = array(  // array with t6ables and respective columns

            //table
            "product"=>array(
                // columns table
                'product.id','product.title','product.image_id','product.category_id','product.price','product.quantity','product.image','product.date'
            ),
            // table
            "company"=>array(
                //colums table
                'company.id','company.name','company.image'
            )
            // more table and columns ............
        );

        $result = self::fetch_data_cookie( $select_and_tables, $array_id_wish_in_cookie ); // ffetch data

        return self::json_data( 'get_wishList' , $result ); // return json data ...........

    }

    public function add_in_cart( $array_Id ){



    }

}

?>