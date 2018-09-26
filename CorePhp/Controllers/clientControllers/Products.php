<?php

use  server\services\crypto\Crypto as crypto;

use  server\database\database as db;

use  server\db\DB as database;

use server\services\fetch\Fetch as fetch;

use server\services\cookie\Cookie as cookie;

class Products extends Controller  // class products extends from fetch keep all method tha are in parent class..................
{
    public $products = array(); //  all products for one page..........................

    public $products_for_page = 20; // default products for one page ..................................

    public $pages_details = array(); // pages details for a category ................................

    public $total_pages; // total pages for  a category ....................................

    private $product_details = array(); //  keep details for one product ............................

    private $table_name = 'product'; // tabel_name to get products.............

    public function __construct()
    {

    }

    public function getproducts( $request ) // method that get products for a category from system or from a company ..........
    {  // get all products .....................................

        $this->products = [];
        $count = '';

        if( cookie::check_cookie('for_page' ) ){

              $for_page =  cookie::get_cookie('for_page');

              $this->products_for_page = $for_page->products_for_page;
        }

        if( $request->type_products =='default'  ){ // if should get products dependet in a company and a category ..........

            $count = database::table( $this->table_name )
                ->count()
                ->where('category_id','=', $request->category_id )
                ->get()[0]['count'];

        }else if( $request->type_products == 'company'  ){

            $request->type_products = crypto::decrypt_in_server( $request->type_products );

            $count = database::table( $this->table_name )
                ->count()
                ->where( 'category_id','=', $request->category_id )
                ->andWhere( 'company_id','=',$request->type_products )
                ->get()[0]['count'];

        }
        else if( $request->type_products == 'search' ){

        }

        self::getpages( $count );

        // category products ...............................................................................

       if( $this->total_pages >= $request->page ) {

           if ($count > 0) {

               if ($count <= $this->products_for_page) {

                   return self::all_products($request);

               } else {

                   return self::limit_products($request, $count);
               }
           }

           return fetch::json_data( array('products' => $this->products, 'pages_details' => false ));

       }else{

           return fetch::json_data( false );
       }

    }

    public function all_products( $request ) // method to get all products that are in table for one category ............
    {
        $this->products = database::table('product')
            ->select(
                'product.id as product_id', 'product.title', 'product.image_id', 'product.category_id', 'product.price',
                'product.quantity', 'product.image', 'product.date', 'product.in_cartList', 'product.in_wishList',
                'company.id as company_id', 'company.name ', 'company.image as company_image'
            )->join('company','product.company_id','=','company.id')
            ->where('product.category_id','=',$request->category_id)
            ->get();

        return fetch::json_data( array( 'products' => $this->products, 'pages_details' => false ));
    }

    public function limit_products( $request, $count ) // method to get limit products for a category......
    {

        if($request->type_products == 'default'){

            $startrow = --$request->page * $this->products_for_page ;
            $this->products = database::table('product')
                ->select(
                    'product.id as product_id', 'product.title', 'product.image_id', 'product.category_id', 'product.price',
                    'product.quantity', 'product.image', 'product.date', 'product.in_cartList', 'product.in_wishList',
                    'company.id as company_id', 'company.name ', 'company.image as company_image'
                )->join('company','product.company_id','=','company.id')
                ->where('product.category_id','=',$request->category_id)
                ->limit($startrow,$this->products_for_page)
                ->get();

        }else if($request->type_products == 'company'){

            $startrow = --$request->page * $this->products_for_page ;
            $this->products = database::table('product')
                ->select(
                    'product.id as product_id', 'product.title', 'product.image_id', 'product.category_id', 'product.price',
                    'product.quantity', 'product.image', 'product.date', 'product.in_cartList', 'product.in_wishList',
                    'company.id as company_id', 'company.name ', 'company.image as company_image'
                )->join('company','product.company_id','=','company.id')
                ->where('product.category_id','=',$request->category_id)
                ->andWhere('')
                ->limit($startrow,$this->products_for_page)
                ->get();

        }

        self::get_pages_details( $request );

        return fetch::json_data( array( 'products' => $this->products, 'pages_details' => $this->pages_details ));

    }

    public function get_product_details( $product ) // method that get product details for one product ......................
    {

        $select_and_tables = array(  // array with t6ables and respective columns

            //table
            "product" => array(
                // columns table
                'product.id', 'product.title', 'product.company_id', 'product.image', 'product.description', 'product.price', 'product.unit_stock'
            ),
            // table

            "company" => array(
                //colums table
                'company.id', 'company.name', 'company.shipping'
            ),
            //  table
            "image_product" => array(
                //columns table
                'image_product.id', 'image_product.image', 'image_product.product_id'
            )
            // more table and columns ............
        );

        $where = 'product.company_id = company.id  AND image_product.product_id = product.id AND product.id = "' . $product->product_id . '"';

        $query = db::select_join( $select_and_tables, $where );

        if ( $query['query']->rowCount() > 0 ) { //  withs multiple image

            $data = fetch::fetch_data_join($query);

            $tmp_image = array();

            $tmp_product = array();

            $tmp_company = array();

            foreach ( $data as $key => $value ) {  // convert image into array .....................

                foreach ($value['image_product'] as $key_image => $image) {

                    $tmp_image[] = $image;
                }
                foreach ($value['company'] as $key_company => $company) {

                    $tmp_company = $company;
                }
                $tmp_product['product'] = $value;

                $tmp_product['product']['company'] = $tmp_company;

                $tmp_product['product']['image_product'] = $tmp_image;
            }//.....................

            $this->product_details = $tmp_product;

            return fetch::json_data( $this->product_details );

        } else { //  dont have multiple image ............

            $select_and_tables = array(  // array with t6ables and respective columns

                "product" => array(
                    // columns table
                    'product.id', 'product.title', 'product.company_id', 'product.image', 'product.description', 'product.price', 'product.unit_stock'
                ),
                // table

                "company" => array(
                    //colums table
                    'company.id', 'company.name', 'company.shipping'
                ),
                // more table and columns ............
            );

            $where = 'product.company_id = company.id  AND product.id = "' . $product->product_id . '"';

            $query = db::select_join($select_and_tables, $where);

            if ($query['query']->rowCount() > 0) {

                $data = fetch::fetch_data_join($query);

                $tmp_image = array();

                $tmp_product = array();

                $tmp_company = array();

                foreach ($data as $key => $value) {  // convert image into array .....................

                    foreach ($value['company'] as $key_company => $company) {

                        $tmp_company = $company;
                    }

                    $tmp_product['product'] = $value;

                    $tmp_product['product']['company'] = $tmp_company;

                    $tmp_product['product']['image_product'] = $tmp_image; //  empty image ........... length 0
                }//.....................


                $this->product_details = $tmp_product;

                return fetch::json_data( $this->product_details );
            }
        }

    }

    public function chnageProductsForPage( $request ){

       $result = cookie::save_coockie('for_page' ,array('products_for_page' => $request->products_for_page) );

       return fetch::json_data( $result );

    }

    public function get_pages_details( $request ) // method that build pages details ..............
    {

        $this->pages_details = array( 'total_pages' =>  $this->total_pages, 'page' => ++$request->page , 'products_for_page' => $this->products_for_page, 'category_id' => $request->category_id );

    }

    public function getpages( $all_row ) // method that make calc all pages for a category..............
    {

        $this->total_pages = ceil($all_row / $this->products_for_page );

    } // end get pages

}  // end class Products

?>
