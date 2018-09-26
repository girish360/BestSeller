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

                $count = database::table('company_category')
                    ->count()
                    ->where('company_id','=',$request->company_id)
                    ->get()[0]['count'];
            }else{

                $count = database::table('sub_category')
                    ->count()
                    ->get()[0]['count'];
            }

        } else { // called more than one time and  number total_categories exist come from client ..................................

            $count = $request->total_categories;
        }

        if( $request->company_id == false ){ // check if is not request from company

            if ( $count >= 5 ) {

                $startrow =  $request->current_page_categories * $this->category_for_load ;

                $this->Categories = database::table('sub_category')
                    ->select('name','id','image')
                    ->limit( $startrow , $this->category_for_load )
                    ->get();
            } else {

                $this->Categories = database::table('sub_category')
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

                $this->Categories = database::table('company_category')
                    ->select('sub_category.name','sub_category.id','sub_category.image')
                    ->join('sub_category','company_category.category_id','=','sub_category.id')
                    ->where('company_category.company_id','=', $request->company_id)
                    ->limit( $startrow , $this->category_for_load )
                    ->get();

            } else {

                $this->Categories = database::table('company_category')
                    ->select('sub_category.name','sub_category.id','sub_category.image')
                    ->join('sub_category','company_category.category_id','=','sub_category.id')
                    ->where('company_category.company_id','=', $request->company_id)
                    ->get();
            }

            $result = array();

            self::dependet_products( $this->Categories, $request  ,'id');

            foreach ( $this->categories_products as $key => $category ){

                $result[] = $category;
            }

            $store_data = array( "current_page_products" => $request->current_page_products, "current_page_categories" => $request->current_page_categories, "total_categories" => $count, "categories_for_page" => $this->category_for_load , "company_id" =>  $request->company_id,"category_id"=>false );

            $company_info = database::table('company')
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

                $this->where = 'product.company_id = company.id AND product.category_id = "' .$category[$category_id_name]. '"';

                $count = database::table('product')
                    ->count()
                    ->where('category_id','=', $category[$category_id_name] )
                    ->get()[0]['count'];

            }else{

                $count = database::table('product')
                    ->count()
                    ->where('category_id','=', $category[$category_id_name] )
                    ->andWhere('company_id','=',$request->company_id)
                    ->get()[0]['count'];


                $this->where = 'product.company_id = company.id AND  product.company_id = "' .$request->company_id. '" AND product.category_id = "' .$category[$category_id_name]. '"';
            }

            if ( $count > 0 ) {

                if ( $count <= $this->products_for_category ){

                    self::all_products( $request->company_id );

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

    public function all_products( $category_id ){
        $this->products =[];
        $this->products = database::table('product')
            ->select(
                'product.id as product_id', 'product.title', 'product.image_id', 'product.category_id', 'product.price',
                'product.quantity', 'product.image', 'product.date', 'product.in_cartList', 'product.in_wishList',
                'company.id as company_id', 'company.name ', 'company.image as company_image'
            )->join('company','product.company_id','=','company.id')
            ->where('product.category_id','=',$category_id)
            ->get();
    }

    public function limit_products( $array_data , $category_id  ){


        $this->products =[];
        $this->products = database::table('product')
            ->select(
                'product.id as product_id', 'product.title', 'product.image_id', 'product.category_id', 'product.price',
                'product.quantity', 'product.image', 'product.date', 'product.in_cartList', 'product.in_wishList',
                'company.id as company_id', 'company.name ', 'company.image as company_image'
            )->join('company','product.company_id','=','company.id')
            ->limit( $array_data->current_page_products * $this->products_for_category , $this->products_for_category )
            ->where('product.category_id','=',$category_id)
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