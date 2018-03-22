<?php

class Products extends Fetch_Data {

    public $all_products;

    public $products_for_page=100;

    public $products_limit = array();

    public $pages_details;

    public $total_pages;

    private $table_name = 'product';

    private $products_columns = array('id','title','image_id','category_id','company_id','price','quantity','unit_stock','date','image' ,'in_cartList' ,'in_wishList');

    public function getproducts( $object_details ){  // get all products .....................................

        $array_data = self::convert_to_array( $object_details ); // object to array

        if( $array_data['type'] == 'default' ){ // home page products ...................................... .....

            $count = self::count( $this->table_name );

            if( $count  <= $this->products_for_page ){

                $result_fromDB = self::select_all( $this->table_name , $this->products_columns ); // get product from db .....

                $this->all_products  = self::fetch_data_array_dependet(
                    $result_fromDB ,
                    array('id','name','date','image' ,'city','state'),
                    array('column'=>'company_id','table_name'=>'company','column_dependet'=>'id')
                );



                return  self::json_data(

                    $this->table_name ,

                    array( 'products'=>$this->all_products , 'pages_details'=>  $this->pages_details )
                );
            }
            else{

                $click = $array_data['number_click'];

                $select_and_tables = array(  // array with t6ables and respective columns

                    //table
                    "product"=>array(
                        // columns table
                        'product.id','product.title','product.image_id','product.category_id','product.price','product.quantity','product.image','product.date','product.in_cartList' ,'product.in_wishList'
                    ),
                    // table
                    "company"=>array(
                        //colums table
                        'company.id','company.name','company.image'
                    )
                    // more table and columns ............
                );

                $where = ' product.company_id = company.id';

                $limit = --$array_data['number_click']*$this->products_for_page.','.$this->products_for_page;

                $res = self::select_join_limit( $select_and_tables ,$where ,$limit );

                if( $res['query']->rowCount() >= 1 ){

                    $this->products_limit  = self::fetch_data_join( $res );

                    self::getpages(  $count );

                    self::get_pages_details( $this->total_pages , ++$array_data['number_click'] , 'default' );

                    return  self::json_data(

                        $this->table_name,

                        array('products'=>$this->products_limit , 'pages_details'=>  $this->pages_details )
                    );

                }else{
                       // category
                }
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










