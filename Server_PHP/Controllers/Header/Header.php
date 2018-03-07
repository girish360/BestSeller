<?php


class Header extends Cookie {




    public function get_wishlist(){

        $array_id_wish_in_cookie = self::get_cookie( 'wishList'  );

        $array_select = array(

            'table_name'=>'products' ,

            'array_select' => array(

                'id','title','id_image','id_category','id_admin','price','quantity','date','image'
            )

            , 'column'=>'id'

        );

        $array_select_dependet = array(

            'table_name'=>'adminat',

            'array_select_dependet' => array(

                'id','name_company','date','imageprofile' ,'city','state'
            )
            , 'column'=>'id_admin'

            ,'column_dependet'=>'id'
        );

        $result = self::fetch_data_dependet_cookie( $array_id_wish_in_cookie , $array_select , $array_select_dependet);

        return self::json_data( 'get_wishList' , $result );

    }

}

?>