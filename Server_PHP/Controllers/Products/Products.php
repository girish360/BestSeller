<?php



class Products extends Fetch_Data {

    public $all_products;

    public $products_for_page=20;

    public $products_limit = array();

    public $pages_details;

    public $total_pages;

    public $count_row;

    public function getproducts( $object_details ){  // get all products .....................................

        $array_data = self::convert_to_array( $object_details );

        if( $array_data['type'] == 'default' ){

            $result_fromDB = self::select_all( $tabel = 'products' ); // get product from db .....

            $tb_name_dep = 'adminat';

            $column_dep='id';

            $id='id_admin';

            $this->count_row = $result_fromDB ->rowCount();

            if( $this->count_row  < $this->products_for_page ){

                $result = self::fetch_data_array_dependet( $result_fromDB , $tb_name_dep , $column_dep , $id );

                $this->all_products = $result;

                return  self::json_data('products', array('products'=>$this->all_products , 'pages_details'=>  $this->pages_details ) );
            }
            else{

                 $click = $array_data['number_click'];

                 $result_limit = self::select_limit('products',$click-1,$this->products_for_page );

                 $this->products_limit = self::fetch_data_array_dependet(  $result_limit , $tb_name_dep , $column_dep , $id );

                 self::getpages(  $this->count_row  );

                 self::get_pages_details(  $this->total_pages , $array_data['number_click'] ,'default' );

                 return  self::json_data('products', array('products'=>$this->products_limit , 'pages_details'=>  $this->pages_details ) );
            }
        }
        else{

        }
    }

    public function get_pages_details( $total_number , $number_click , $type_link ){

        $this->pages_details = array( 'total_number'=>$total_number  , 'number_click'=>$number_click , 'type_link'=> $type_link );



    }

    public function getpages( $all_row ){

        $this->total_pages = ceil($all_row/$this->products_for_page);

    }


}




?>










