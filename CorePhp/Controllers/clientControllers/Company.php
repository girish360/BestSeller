<?php

use  server\services\crypto\Crypto as crypto;

use  server\database\database as db;

use server\db\DB as database;

use server\services\fetch\Fetch as fetch;

class Company extends Controller {

    private $where;

    private $products_for_category = 10; // number of products for every category

    private $categories_for_load = 5; // number of categories for every load

    private $categories = array(); // categories for a company

    private $products = array(); // products for one category

    private $info; // information about the company  id name , image etc

    private $categories_products = array(); // categories with some products for every category

    private $request; // data from client

    private $store_data;

    public function load_company( $request ){

        return self::check_company( $request );

    }

    private function check_company( $request ){

        $this->info = database::table('company') // get info from current company_id that is in url  ...............
            ->select("id","name",'image')
            ->where( 'id','=',$request->company_id )
            ->get();

        if( count( $this->info) >= 1 ){ // find company with id that is in url

            $this->info = $this->info[0];

            if( $this->info['name'] == $request->company_name ){ // check if name is similar with name in url

                self::categories_products( $request );  //  get categories with some product inside this company

                return fetch::json_data(  array( "categories"=> $this->categories  ,"categories_products" =>  $this->categories_products, "store_data" => $this->store_data , "company_info"=>$this->info ) );

            }

            return fetch::json_data(false); // return false becouse name in url and in this company is not similar

        }else{

            return fetch::json_data(false); // return false becouse can not find any company with is that is in url
        }
    }

    private  function categories_products( $request  ){

        if ( $request->total_categories == 0 ) { //  first call................................

            $count = database::table('company_category')
                ->count()
                ->where('company_id','=',$request->company_id)
                ->get()[0]['count'];


        } else { // called more than one time and  number total_categories exist come from client ..................................

            $count = $request->total_categories;
        }

        if ( $count >= $this->categories_for_load ) {

            $startrow =  $request->current_page_categories * $this->categories_for_load ;

            $categories = database::table('company_category')
                ->select('sub_category.name','sub_category.id','sub_category.image')
                ->join('sub_category','company_category.category_id','=','sub_category.id')
                ->where('company_category.company_id','=', $request->company_id)
                ->limit( $startrow , $this->categories_for_load )
                ->get();

            self::categories($request);

        } else {

            $categories = database::table('company_category')
                ->select('sub_category.name','sub_category.id','sub_category.image')
                ->join('sub_category','company_category.category_id','=','sub_category.id')
                ->where('company_category.company_id','=', $request->company_id)
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

    private function categories($request){

        $categories = database::table('company_category')
            ->select('sub_category.name','sub_category.id','sub_category.image' ,'company_category.slide_image')
            ->join('sub_category','company_category.category_id','=','sub_category.id')
            ->where('company_category.company_id','=', $request->company_id)
            ->get();

        $this->categories = $categories;

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