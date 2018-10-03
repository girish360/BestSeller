<?php

use  server\services\crypto\Crypto as crypto;

use  server\database\database as db;

use server\db\DB as database;

use server\services\fetch\Fetch as fetch;

class Home extends Controller {

    private $where;

    private $products_for_category = 10;

    private $category_for_load = 5;

    private $Categories = array();

    private $products = array();

    private $categories_products = array();

    public  function get_categories ( $request ){

        if ( $request->total_categories == 0 ) { //  first call................................

            if( $request->company_id != false ){

                $count = database::table('suppliers_categories')
                    ->count()
                    ->where('supplier_id','=',$request->company_id)
                    ->get()[0]['count'];
            }else{

                $count = database::table('subcategories')
                    ->count()
                    ->get()[0]['count'];
            }

        } else { // called more than one time and  number total_categories exist come from client ..................................

            $count = $request->total_categories;
        }

        if( $request->company_id == false ){ // check if is not request from company

            if ( $count >= 5 ) {

                $startrow =  $request->current_page_categories * $this->category_for_load ;

                $this->Categories = database::table('subcategories')
                    ->select('name','id','image')
                    ->limit( $startrow , $this->category_for_load )
                    ->get();
            } else {

                $this->Categories = database::table('subcategories')
                    ->select( 'name', 'id', 'image' )
                    ->get();
            }

            self::dependet_products( $this->Categories, $request  , 'id' );

            $result = array();

            foreach ( $this->categories_products as $key => $category ) {

                $result[] = $category;
            }

            $store_data = array("current_page_products" => $request->current_page_products, "current_page_categories" => $request->current_page_categories, "total_categories" => $count, "categories_for_page" => $this->category_for_load , "company_id" => false ,"category_id"=>false );

            return fetch::json_data(  array( "categories" => $result, "store_data" => $store_data) );

        }else{ // request from company to get categories with some products with  this company unique id....

            if ( $count >= 5 ) {

                $startrow =  $request->current_page_categories * $this->category_for_load ;

                $this->Categories = database::table('suppliers_categories')
                    ->select('subcategories.name','subcategories.id','subcategories.image')
                    ->join('subcategories','suppliers_categories.category_id','=','subcategories.id')
                    ->where('suppliers_categories.supplier_id','=', $request->company_id)
                    ->limit( $startrow , $this->category_for_load )
                    ->get();

            } else {

                $this->Categories = database::table('suppliers_categories')
                    ->select('subcategories.name','subcategories.id','subcategories.image')
                    ->join('subcategories','suppliers_categories.category_id','=','subcategories.id')
                    ->where('suppliers_categories.supplier_id','=', $request->company_id)
                    ->get();
            }

            $result = array();

            self::dependet_products( $this->Categories, $request  ,'id');

            foreach ( $this->categories_products as $key => $category ){

                $result[] = $category;
            }

            $store_data = array( "current_page_products" => $request->current_page_products, "current_page_categories" => $request->current_page_categories, "total_categories" => $count, "categories_for_page" => $this->category_for_load , "company_id" =>  $request->company_id,"category_id"=>false );

            $company_info = database::table('suppliers')
                ->select("id","name")
                ->where('id','=',$request->company_id)
                ->get();

            return fetch::json_data(  array( "categories" => $result, "store_data" => $store_data , "company_info"=>$company_info[0] ) );
        }
    }

    public function dependet_products( $array_categories ,$request , $category_id_name ){  // get all products .....................................

        foreach ( $array_categories as $key => $category ){

            $this->products = [];

            $this->categories_products[$category[$category_id_name]] = $category;


            if( $request->company_id == false ){

                $count = database::table('products')
                    ->count()
                    ->where('category_id','=', $category[$category_id_name] )
                    ->get()[0]['count'];

            }else{

                $count = database::table('products')
                    ->count()
                    ->where('category_id','=', $category[$category_id_name] )
                    ->andWhere('supplier_id','=',$request->company_id)
                    ->get()[0]['count'];
            }

            if ( $count > 0 ) {

                if ( $count <= $this->products_for_category ){

                    self::all_products( $category[$category_id_name] );

                    $this->categories_products[$category[$category_id_name]]['products'] = $this->products;

                    $this->categories_products[$category[$category_id_name]]['total_products'] = $count;

                    $this->categories_products[$category[$category_id_name]]['products_for_page'] = $this->products_for_category;

                    $this->categories_products[$category[$category_id_name]]['current_page_products'] = 0;

                } else {

                    self::limit_products( $request , $category[$category_id_name] );

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

    public function all_products(  $category_id ){
        $this->products =[];
        $this->products = database::table('products')
            ->select(
                'products.id as product_id', 'products.title', 'products.image_id', 'products.category_id', 'products.price',
                'products.quantity', 'products.image', 'products.date', 'products.in_cartList', 'products.in_wishList',
                'suppliers.id as company_id', 'suppliers.name ', 'suppliers.image as company_image'
            )->join('suppliers','products.supplier_id','=','suppliers.id')
            ->where('products.category_id','=',$category_id)
            ->get();
    }

    public function limit_products( $array_data , $category_id  ){


        $this->products =[];
        $this->products = database::table('products')
            ->select(
                'products.id as product_id', 'products.title', 'products.image_id', 'products.category_id', 'products.price',
                'products.quantity', 'products.image', 'products.date', 'products.in_cartList', 'products.in_wishList',
                'suppliers.id as company_id', 'suppliers.name ', 'suppliers.image as company_image'
            )->join('suppliers','products.supplier_id','=','suppliers.id')
            ->limit( $array_data->current_page_products * $this->products_for_category , $this->products_for_category )
            ->where('products.category_id','=',$category_id)
            ->get();
    }

    public function more_products(  $data_object  ){

        $tmp_products = [];

        if( $data_object->company_id == false ){

            $this->where = 'products.supplier_id = suppliers.id AND products.category_id = "' . $data_object->category_id . '"';

        }else{

            $company_id = crypto::decrypt_in_server( $data_object->company_id);

            $data_object->company_id = $company_id;

            $this->where = 'products.supplier_id = suppliers.id AND  products.supplier_id = "' .$data_object->company_id. '" AND products.category_id = "' . $data_object->category_id. '"';
        }


        self::limit_products( $data_object , $data_object->category_id );

        $tmp_products['current_page_products'] =  $data_object->current_page_products;

        $tmp_products['category_id'] = $data_object->category_id;

        $tmp_products['products'] = $this->products;

        return fetch::json_data(  $tmp_products );

    }



}

?>