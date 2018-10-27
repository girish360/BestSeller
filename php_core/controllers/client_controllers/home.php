<?php

use server\services\crypto\crypto as crypto;

use server\database\database as db;

use server\db\DB as database;

use server\services\fetch\fetch as fetch;

class home extends controller {

    private $products_for_category = 10;

    private $category_for_load = 5;

    private $Categories = array();

    private $products = array();

    private $categories_products = array();

    public  function get_categories ( $request ){

        if ( $request->total_categories == 0 ) { //  first call................................

            $count = database::table('subcategories')
                ->count()
                ->get()['count'];

        } else { // called more than one time and  number total_categories exist come from client ..................................

            $count = $request->total_categories;
        }

        if ( $count >= 5 ) {

            $startrow =  $request->current_page_categories * $this->category_for_load ;

            $this->Categories = database::table('subcategories')
                ->select('name','id','image')
                ->limit( $startrow , $this->category_for_load )
                ->get();
        }else{
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
    }

    public function dependet_products( $array_categories ,$request , $category_id_name ){  // get all products .....................................

        foreach ( $array_categories as $key => $category ){

            $this->products = [];

            $this->categories_products[$category[$category_id_name]] = $category;

            $count = database::table('products')
                ->count()
                ->where('category_id','=', $category[$category_id_name] )
                ->get()['count'];

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
                'products.quantity', 'products.image', 'products.created_at', 'products.in_cartList', 'products.in_wishList',
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
                'products.quantity', 'products.image', 'products.created_at', 'products.in_cartList', 'products.in_wishList',
                'suppliers.id as company_id', 'suppliers.name ', 'suppliers.image as company_image'
            )->join('suppliers','products.supplier_id','=','suppliers.id')
            ->limit( $array_data->current_page_products * $this->products_for_category , $this->products_for_category )
            ->where('products.category_id','=',$category_id)
            ->get();
    }

    public function more_products(  $data_object  ){

        $tmp_products = [];

        self::limit_products( $data_object , $data_object->category_id );

        $tmp_products['current_page_products'] =  $data_object->current_page_products;

        $tmp_products['category_id'] = $data_object->category_id;

        $tmp_products['products'] = $this->products;

        return fetch::json_data(  $tmp_products );

    }

}

?>