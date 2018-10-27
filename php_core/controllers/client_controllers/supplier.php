<?php

use  server\services\crypto\crypto as crypto;

use  server\database\database as db;

use server\db\DB as database;

use server\services\fetch\fetch as fetch;

define('SUPPLIERS','suppliers');

define('CATEGORIES','suppliers_categories');

define('SUBCATEGORIES','subcategories');


class supplier extends controller {

    private $where;

    private $products_for_category = 10; // number of products for every category

    private $categories_for_load = 5; // number of categories for every load

    private $categories = array(); // categories for a company

    private $products = array(); // products for one category

    private $supplier = false; // information about the company  id name , image etc

    private $categories_products = array(); // categories with some products for every category

    private $request; // data from client

    private $store_data;

    public function check( $request ){ // check for supplier if exists ......................................

        $this->request = $request;

        self::supplier_info();

        if( $this->supplier != false ){

            self::categories(); // get slide

            self::home($this->request); // get  home categories ang dependet products for each category

        }else{

            return fetch::json_data(false );
        }

        return fetch::json_data(  array( "categories"=> $this->categories,"company_info"=>$this->supplier   ,"categories_products" =>  $this->categories_products, "store_data" => $this->store_data  ) );

    }

    public function supplier_info(){ //  get supplier info

        $supplier = database::table( SUPPLIERS ) // get info from current company_id that is in url  ...............
        ->select("id","name",'image')
            ->where( 'id','=',$this->request->company_id )
            ->get();

        if( !empty( $supplier )  ) {


            if ( $supplier['name'] == $this->request->company_name) {

               $this->supplier = $supplier;

            }
        }
    }

    public function fd( $request ){

        self::supplier_info();

        if( $this->supplier['name'] == $request->company_name ){ // check if name is similar with name in url

            self::home( $request );  //  get categories with some product inside this company

            return fetch::json_data(  array( "categories"=> $this->categories  ,"categories_products" =>  $this->categories_products, "store_data" => $this->store_data  ) );

        }

        return fetch::json_data(false); // return false becouse name in url and in this company is not similar


    }



    public function home( $request  ){

         $this->request = $request;


        if ( $request->total_categories == 0 ) { //  first call................................

            $count = database::table(CATEGORIES )
                ->count()
                ->where('supplier_id','=',$request->company_id)
                ->get()['count'];


        } else { // called more than one time and  number total_categories exist come from client ..................................

            $count = $request->total_categories;
        }

        if ( $count >= $this->categories_for_load ) {

            $startrow =  $request->current_page_categories * $this->categories_for_load ;

            $categories = database::table(CATEGORIES)
                ->select('subcategories.name','subcategories.id','subcategories.image')
                ->join( SUBCATEGORIES ,'suppliers_categories.category_id','=','subcategories.id')
                ->where('suppliers_categories.supplier_id','=', $request->company_id )
                ->limit( $startrow , $this->categories_for_load )
                ->get();

            self::categories();

        } else {

             $categories = database::table(CATEGORIES)
                ->select('subcategories.name','subcategories.id','subcategories.image')
                ->join( SUBCATEGORIES ,'suppliers_categories.category_id','=','subcategories.id')
                ->where('suppliers_categories.supplier_id','=', $request->company_id )
                 ->get();

            $this->categories = $categories;
        }

        $result = array();

        self::dependet_products( $categories, $request  ,'id');

        foreach ( $this->categories_products as $key => $category ){

            $result[] = $category;
        }

        $this->categories_products =  $result;

        $this->store_data = array( "current_page_products" => $request->current_page_products, "current_page_categories" => $request->current_page_categories, "total_categories" => $count, "categories_for_page" => $this->categories_for_load , "company_id" =>  $request->company_id,"category_id"=>false );

    }

    private function categories(){

        $categories = database::table(CATEGORIES)
            ->select('subcategories.name','subcategories.id','subcategories.image' ,'suppliers_categories.image')
            ->join(SUBCATEGORIES,'suppliers_categories.category_id','=','subcategories.id')
            ->where('suppliers_categories.supplier_id','=', $this->request->company_id)
            ->get();

        if( count( $categories ) >= 1 ){

            $this->categories = $categories;

        }else{

            $this->categories = false;
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
                    ->get()['count'];

            }else{

                $count = database::table('products')
                    ->count()
                    ->where('category_id','=', $category[$category_id_name] )
                    ->andWhere('supplier_id','=',$request->company_id)
                    ->get()['count'];

            }

            if ( $count > 0 ) {

                if ( $count <= $this->products_for_category ){

                    self::all_products( $request, $category[$category_id_name] );

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

    public function all_products( $request , $category_id ){

        $this->products =[];

        $this->products = database::table('products')
            ->select(
                'products.id as product_id', 'products.title', 'products.image_id', 'products.category_id', 'products.price',
                'products.quantity', 'products.image', 'products.created_at', 'products.in_cartList', 'products.in_wishList',
                'suppliers.id as company_id', 'suppliers.name ', 'suppliers.image as company_image'
            )->join('suppliers','products.supplier_id','=','suppliers.id')
            ->where('products.category_id','=',$category_id )
            ->andWhere('suppliers.id','=',$request->company_id )
            ->get();
    }

    public function limit_products( $request , $category_id  ){

        $this->products =[];

        $this->products = database::table('products')
            ->select(
                'products.id as product_id', 'products.title', 'products.image_id', 'products.category_id', 'products.price',
                'products.quantity', 'products.image', 'products.created_at', 'products.in_cartList', 'products.in_wishList',
                'suppliers.id as company_id', 'suppliers.name ', 'suppliers.image as company_image'
            )->join('suppliers','products.supplier_id','=','suppliers.id')
            ->limit( $request->current_page_products * $this->products_for_category , $this->products_for_category )
            ->where('products.category_id','=',$category_id)
            ->andWhere('suppliers.id','=',$request->company_id )
            ->get();


    }

    public function more_products(  $data_object  ){

        $tmp_products = [];

        if( $data_object->company_id == false ){

            $this->where = 'product.company_id = company.id AND product.category_id = "' . $data_object->category_id . '"';

        }else{

            $company_id = crypto::decrypt_in_server( $data_object->company_id);

            $data_object->company_id = $company_id;

            $this->where = 'product.company_id = company.id AND  product.company_id = "' .$data_object->company_id. '" AND product.category_id = "' . $data_object->category_id. '"';
        }


        self::limit_products( $data_object , $data_object->category_id );

        $tmp_products['current_page_products'] =  $data_object->current_page_products;

        $tmp_products['category_id'] = $data_object->category_id;

        $tmp_products['products'] = $this->products;

        return fetch::json_data(  $tmp_products );

    }



}

?>