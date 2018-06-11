<?php

    class Products extends Cookie  // class products extends from fetch_data keep all method tha are in parent class..................
    {
        public $products = array(); //  all products for one page..........................

        public $products_for_page = 40; // default products for one page ..................................

        public $pages_details = array(); // pages details for a category ................................

        public $total_pages; // total pages for  a category ....................................

        private $product_details = array(); //  keep details for one product ............................

        private $table_name = 'product'; // tabel_name to get products.............

        public function __construct()
        {
            parent::__CONSTRUCT();


        }

        public function getproducts( $products_object ) // method that get products for a category from system or from a company ..........
        {  // get all products .....................................

            $this->products = [];

            $select_and_tables = array(  // array with t6ables and respective columns

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
            // sdfsdfsdsdfsd


            $decrypted = self::decrypt_in_server( $products_object->category_id );

            $products_object->category_id = $decrypted;

            if( $products_object->type_products != 'default' ){ // if should get products dependet in a company and a category ..........

                $products_object->type_products = self::decrypt_in_server( $products_object->type_products );

                $count = self::count_where( $this->table_name, array( "category_id" => $products_object->category_id ,"company_id"=> $products_object->type_products ) );

                $where = ' product.company_id = "'.$products_object->type_products.'" AND product.category_id = "' . $products_object->category_id . '"';
            }else{

                $count = self::count_where( $this->table_name, array( "category_id" => $products_object->category_id ) );

                $where = ' product.company_id = company.id AND product.category_id = "' . $products_object->category_id . '"';
            }

            // category products ...............................................................................

            if ( $count > 0 ) {

                if ( $count <= $this->products_for_page ) {

                    return self::all_products( $select_and_tables, $where );

                } else{

                    return self::limit_products( $select_and_tables, $where, $products_object, $count );
                }
            }
            return self::json_data(

                $this->table_name,

                array('products' => $this->products, 'pages_details' => 'null')
            );

        }

        public function all_products( $select_and_tables, $where ) // method to get all products that are in table for one category ............
        {

            $res = self::select_join( $select_and_tables, $where );

            $data = self::fetch_data_join_one( $res );

            foreach ( $data as $ket => $value ) {

                $this->products[] = $value;
            }

            return self::json_data(

                $this->table_name,

                array( 'products' => $this->products, 'pages_details' => 'null' )
            );

        }

        public function limit_products( $select_and_tables, $where, $products_object, $count ) // method to get limit products for a category......
        {

            $limit = --$products_object->number_click * $this->products_for_page . ',' . $this->products_for_page;

            $res = self::select_join_limit( $select_and_tables, $where, $limit );

            $data = self::fetch_data_join_one( $res );

            foreach ( $data as $ket => $value ) {

                $this->products[] = $value;
            }

            self::getpages( $count );

            self::get_pages_details( $this->total_pages, $products_object );

            return self::json_data(

                $this->table_name,

                array( 'products' => $this->products, 'pages_details' => $this->pages_details )
            );

        }

        public function get_product_details( $status, $product_id ) // method that get product details for one product ......................
        {

            $product_id = self::decrypt_in_server($product_id);

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

            $where = 'product.company_id = company.id  AND image_product.product_id = product.id AND product.id = "' . $product_id . '"';

            $query = self::select_join( $select_and_tables, $where );

            if ( $query['query']->rowCount() > 0 ) { //  withs multiple image

                $data = self::fetch_data_join($query);

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

                return self::json_data( // return result into json .............................

                    $status,

                    $this->product_details
                );

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

                $where = 'product.company_id = company.id  AND product.id = "' . $product_id . '"';

                $query = self::select_join($select_and_tables, $where);

                if ($query['query']->rowCount() > 0) {

                    $data = self::fetch_data_join($query);

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

                    return self::json_data(

                        $status,

                        $this->product_details
                    );
                }
            }

        }

        public function get_pages_details( $total_number, $products_object ) // method that build pages details ..............
        {

            $this->pages_details = array( 'type_products'=>$products_object->type_products,'total_number' => $total_number, 'number_click' => ++$products_object->number_click , 'category_id' => $products_object->category_id );

        }

        public function getpages( $all_row ) // method that make calc all pages for a category..............
        {

            $this->total_pages = ceil($all_row / $this->products_for_page );

        } // end get pages

    }  // end class Products

?>
