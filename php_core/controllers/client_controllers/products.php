<?php

use  server\services\crypto\crypto as crypto;

use  server\database\database as db;

use  server\db\DB as database;

use server\services\fetch\fetch as fetch;

use server\services\cookie\cookie as cookie;

class products extends controller  // class products extends from fetch keep all method tha are in parent class..................
{
    public $products = array(); //  all products for one page..........................

    public $products_for_page = 20; // default products for one page ..................................

    public $pages_details = array(); // pages details for a category ................................

    public $total_pages; // total pages for  a category ....................................

    private $product_details = array(); //  keep details for one product ............................

    private $table_name = 'products'; // tabel_name to get products.............

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

        }else if( $request->type_products == 'supplier'){

            $request->type_products = crypto::decrypt_in_server( $request->type_products );

            $count = database::table( $this->table_name )
                ->count()
                ->where( 'category_id','=', $request->category_id )
                ->andWhere( 'supplier_id','=',$request->type_products )
                ->get()[0]['count'];

        }
        else if( $request->type_products == 'search'){

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
        $this->products = database::table('products')
            ->select(
                'products.id as product_id', 'products.title', 'products.image_id', 'products.category_id', 'products.price',
                'products.quantity', 'products.image', 'products.date', 'products.in_cartList', 'products.in_wishList',
                'suppliers.id as company_id', 'suppliers.name ', 'suppliers.image as company_image'
            )->join('suppliers','products.supplier_id','=','suppliers.id')
            ->where('products.category_id','=',$request->category_id)
            ->get();



        self::get_pages_details( $request );

        return fetch::json_data( array( 'products' => $this->products, 'pages_details' => $this->pages_details ));
    }

    public function limit_products( $request, $count ) // method to get limit products for a category......
    {

        if($request->type_products == 'default'){

            $startrow = --$request->page * $this->products_for_page ;
            $this->products = database::table('products')
                ->select(
                    'products.id as product_id', 'products.title', 'products.image_id', 'products.category_id', 'products.price',
                    'products.quantity', 'products.image', 'products.date', 'products.in_cartList', 'products.in_wishList',
                    'suppliers.id as company_id', 'suppliers.name ', 'suppliers.image as company_image'
                )->join('suppliers','products.supplier_id','=','suppliers.id')
                ->where('products.category_id','=',$request->category_id)
                ->limit($startrow,$this->products_for_page)
                ->get();

        }else if($request->type_products == 'supplier'){

            $startrow = --$request->page * $this->products_for_page ;
            $this->products = database::table('products')
                ->select(
                    'products.id as product_id', 'products.title', 'products.image_id', 'products.category_id', 'products.price',
                    'products.quantity', 'products.image', 'products.date', 'products.in_cartList', 'products.in_wishList',
                    'suppliers.id as company_id', 'suppliers.name ', 'suppliers.image as company_image'
                )->join('suppliers','products.company_id','=','suppliers.id')
                ->where('products.category_id','=',$request->category_id)
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
                'products.id', 'products.title', 'products.company_id', 'products.image', 'products.description', 'products.price', 'products.unit_stock'
            ),
            // table

            "company" => array(
                //colums table
                'company.id', 'company.name', 'company.shipping'
            ),
            //  table
            "image_product" => array(
                //columns table
                'image_products.id', 'image_products.image', 'image_products.product_id'
            )
            // more table and columns ............
        );

        $product_Details = database::table( $this->table_name )

            ->select(
                'products.id as product_id', 'products.title', 'products.supplier_id', 'products.image', 'products.description', 'products.price', 'products.unit_stock',
                'suppliers.id as supplier_id', 'suppliers.name', 'suppliers.shipping')
            ->join('suppliers','products.supplier_id','=','suppliers.id')
            ->where('products.id','=',$product->product_id)
            ->get();

        if( count($product_Details) == 1 ){
            $product_Details = $product_Details[0];
        }

        $tmp_product = array ();

        $tmp_product['product'] = $product_Details;

        $tmp_product['supplier'] = 0;



        return fetch::json_data($tmp_product);
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

}  // end class products

?>
