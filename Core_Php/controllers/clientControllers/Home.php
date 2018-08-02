<?php

use  server\services\crypto\Crypto as crypto;

use  server\database\database as db;

use server\services\fetch\Fetch as fetch;

class Home extends Controller {

    private $table;

    private $select_and_tables;

    private $where;

    private $products_for_category = 10;

    private $category_for_load = 10;

    private $Categories = array();

    private $products = array();

    private $categories_products = array();

    public  function get_categories ( $data_object ){

        $array_data = fetch::convert_to_array( $data_object );

        $company_id_encrypted =  $array_data['company_id'];

        if( $array_data['company_id'] != false ){

            $company_id = crypto::decrypt_in_server( $array_data['company_id'] );

            $array_data['company_id'] = $company_id;
        }

        if ( $array_data['total_categories'] == 0 ) { //  first call................................

            if( $array_data['company_id'] != false ){

                $count = db::count_where($this->table ='company_category' ,array( "company_id" =>  $array_data['company_id'] ));

            }else{

                $count = db::count($this->table ='sub_category');
            }

        } else { // called more than one time and  number total_categories exist come from client ..................................

            $count = $array_data['total_categories'];
        }

        if( $array_data['company_id'] == false ) { // check if is not request from company

            self::products_tables();

            if ( $count >= 5 ) {

                $query = db::select_limit( $this->table='sub_category' , array('name', 'id', 'image'), $array_data['current_page_categories'], $this->category_for_load );

            } else {

                $query = db::select( $this->table='sub_category' , array( 'name', 'id', 'image' ) );
            }

            $this->Categories = $query->fetchAll();

            self::dependet_products( $this->Categories, $array_data  , 'id' );

            foreach ( $this->categories_products as $key => $category ) {

                $result [] = $category;
            }
            $store_data = array("current_page_products" => $array_data['current_page_products'], "current_page_categories" => $array_data['current_page_categories'], "total_categories" => $count, "categories_for_page" => $this->category_for_load , "company_id" => false ,"category_id"=>false );

            return fetch::json_data(  array( "categories" => $result, "store_data" => $store_data) );

        }else{ // request from company to get categories with some products with  this company unique id....

            self::categories_tables();

            $this->where ="company_category.company_id = '".$array_data['company_id']."' AND sub_category.id = company_category.category_id";

            if ( $count >= 5 ) {

                $limit = $array_data['current_page_categories'] * $this->category_for_load . ',' . $this->category_for_load ;

                $query = db::select_join_limit( $this->select_and_tables , $this->where , $limit );

            } else {

                $query = db::select_join(  $this->select_and_tables , $this->where );
            }

            $this->Categories = $query['query']->fetchAll();

            $result = array();

            self::dependet_products( $this->Categories, $array_data  ,'sub_category_id');

            foreach ( $this->categories_products as $key => $category ){

                $result[] = $category;
            }

            $store_data = array( "current_page_products" => $array_data['current_page_products'], "current_page_categories" => $array_data['current_page_categories'], "total_categories" => $count, "categories_for_page" => $this->category_for_load , "company_id" => $company_id_encrypted,"category_id"=>false );

            $company_query = db::select_where('company',array("id","name","image_slide_id"),array("id"=>$array_data['company_id']) );

            $company_info = fetch::fetch_data_object( $company_query );

            return fetch::json_data(  array( "categories" => $result, "store_data" => $store_data , "company_info"=>$company_info ) );
        }
    }




    public function dependet_products( $array_categories ,$array_data , $category_id_name ){  // get all products .....................................

        foreach ( $array_categories as $key => $category ){

            $this->products = [];

            $this->categories_products[$category[$category_id_name]] = $category;

            $count = db::count_where( $this->table = 'product' , array( "category_id" => $category[$category_id_name] ) );

            if( $array_data['company_id'] == false ){

                $this->where = 'product.company_id = company.id AND product.category_id = "' .$category[$category_id_name]. '"';
                $count = db::count_where( $this->table = 'product' , array( "category_id" => $category[$category_id_name] ) );

            }else{
                $count = db::count_where( $this->table = 'product' , array( "category_id" => $category[$category_id_name] ,"company_id"=>$array_data['company_id']) );
                $this->where = 'product.company_id = company.id AND  product.company_id = "' .$array_data['company_id']. '" AND product.category_id = "' .$category[$category_id_name]. '"';
            }

            if ( $count > 0 ) {

                if ( $count <= $this->products_for_category ){

                    self::all_products();

                    $this->categories_products[$category[$category_id_name]]['products'] = $this->products;

                    $this->categories_products[$category[$category_id_name]]['total_products'] = $count;

                    $this->categories_products[$category[$category_id_name]]['products_for_page'] = $this->products_for_category;

                    $this->categories_products[$category[$category_id_name]]['current_page_products'] = 0;

                } else {

                    self::limit_products( $array_data );

                    $this->categories_products[$category[$category_id_name]]['products'] = $this->products;

                    $this->categories_products[$category[$category_id_name]]['total_products'] = $count;

                    $this->categories_products[$category[$category_id_name]]['products_for_page'] = $this->products_for_category;

                    $this->categories_products[$category[$category_id_name]]['current_page_products'] = 0;
                }
            }else{
                $this->categories_products[$category[$category_id_name]]['products'] = $this->products;

                $this->categories_products[$category[$category_id_name]]['total_products'] = $count;

                $this->categories_products[$category[$category_id_name]]['products_for_page'] = $this->products_for_category;

                $this->categories_products[$category[$category_id_name]]['current_page_products'] = 0;
            }
        }
    }

    public function all_products( )
    {
        self::products_tables();

        $this->products =[];

        $res = db::select_join( $this->select_and_tables, $this->where );

        $data = fetch::fetch_data_join_one( $res );

        foreach ( $data as $ket => $value ) {

            $this->products[] = $value;
        }
    }

    public function limit_products(  $array_data )

    {
        self::products_tables();

        $this->products =[];

        $limit = $array_data['current_page_products'] * $this->products_for_category . ',' . $this->products_for_category;

        $res = db::select_join_limit( $this->select_and_tables, $this->where, $limit );

        $data = fetch::fetch_data_join_one($res);

        foreach ( $data as $ket => $value ) {

            $this->products[] = $value;
        }

    }

    public function more_products(  $data_object  ){

        $tmp_products = [];

        $data_array = fetch::convert_to_array( $data_object );

        self::products_tables();

        if( $data_array['company_id'] == false ){

            $this->where = 'product.company_id = company.id AND product.category_id = "' . $data_array['category_id'] . '"';

        }else{

            $company_id = crypto::decrypt_in_server( $data_array['company_id'] );

            $data_array['company_id'] = $company_id;

            $this->where = 'product.company_id = company.id AND  product.company_id = "' .$data_array['company_id']. '" AND product.category_id = "' . $data_array['category_id']. '"';
        }


        self::limit_products( $data_array );

        $tmp_products['current_page_products'] =  $data_array['current_page_products'];

        $tmp_products['category_id'] = $data_array['category_id'];

        $tmp_products['products'] = $this->products;

        return fetch::json_data(  $tmp_products );

    }

    public function products_tables(){

        $this->select_and_tables = array(  // array with t6ables and respective columns

            //table
            "product" => array(
                // columns table
                'product.id', 'product.title', 'product.image_id', 'product.category_id', 'product.price', 'product.quantity', 'product.image', 'product.date', 'product.in_cartList', 'product.in_wishList'
            ),
            // table
            "company" => array(
                //colums table
                'company.id', 'company.name', 'company.image'
            )
            // more table and columns ............
        );
    }
    public function categories_tables(){

        $this->select_and_tables = array(  // array with t6ables and respective columns

            //table
            "company_category" => array(
                // columns table
                'company_category.category_id', 'company_category.company_id'
            ),
            // table
            "sub_category" => array(
                //colums table
                'sub_category.id', 'sub_category.name', 'sub_category.image'
            )
            // more table and columns ............
        );
    }
}

?>