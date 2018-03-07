<?php

class Products extends Fetch_Data {

    public $all_products;

    public $products_for_page=20;

    public $products_limit = array();

    public $pages_details;

    public $total_pages;

    private $table_name = 'products';

    private $products_columns = array('id','title','id_image','id_category','id_admin','price','quantity','date','image');

    public function getproducts( $object_details ){  // get all products .....................................

        $array_data = self::convert_to_array( $object_details ); // object to array

        if( $array_data['type'] == 'default' ){ // home page products ...................................... .....

            $count = self::count( $this->table_name );

            $tb_name_dep = 'adminat';

            $column_dep='id';

            $id='id_admin';

            if( $count  <= $this->products_for_page ){

                $result_fromDB = self::select_all( $this->table_name , $this->products_columns ); // get product from db .....

                $result = self::fetch_data_array_dependet(
                    $result_fromDB ,

                    $tb_name_dep ,

                    $column_dep ,

                    $id
                );

                $this->all_products = $result;

                return  self::json_data(

                    $this->table_name ,

                    array( 'products'=>$this->all_products , 'pages_details'=>  $this->pages_details )
                );
            }
            else{

                $click = $array_data['number_click'];

                $result_fromDB = self::select_limit(
                    $this->table_name,
                    $this->products_columns ,
                    $click-1 ,
                    $this->products_for_page
                );

                $this->products_limit = self::fetch_data_array_dependet(

                    $result_fromDB ,
                    array('id','name_company','date','imageprofile' ,'city','state'),
                    array('column'=>'id_admin','table_name'=>'adminat','column_dependet'=>'id')
                );

                self::getpages(  $count );

                self::get_pages_details( $this->total_pages , $array_data['number_click'] , 'default' );

                return  self::json_data(
                    $this->table_name,
                    array('products'=>$this->products_limit , 'pages_details'=>  $this->pages_details )
                );
            }
        }
        else{ // category products ...............................................................................

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










