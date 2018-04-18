<?php


    class Products extends Fetch_Data
    {
        public $products = array();

        public $products_for_page = 50;

        public $pages_details = array();

        public $total_pages;

        private $product_details = array();

        private $table_name = 'product';

        public function getproducts($object_details)
        {  // get all products .....................................

            $this->products = [];

            $array_data = self::convert_to_array($object_details); // object to array

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
            $crypto = new Crypto();

            $decrypted = $crypto->decrypt_in_server($array_data['type']);

            $array_data['type'] = $decrypted;

            // category products ...............................................................................

            $count = self::count_where($this->table_name, array("category_id" => $array_data['type']));

            $where = 'product.company_id = company.id AND product.category_id = "' . $array_data['type'] . '"';

            if ($count > 0) {

                if ($count <= $this->products_for_page) {

                    return self::all_products($select_and_tables, $where);

                } else {

                    return self::limit_products( $select_and_tables, $where, $array_data, $count );
                }
            }
            return self::json_data(

                $this->table_name,

                array('products' => $this->products, 'pages_details' => 'null')
            );

        }

        public function all_products($select_and_tables, $where)
        {

            $res = self::select_join($select_and_tables, $where);

            $data = self::fetch_data_join_one($res);

            foreach ($data as $ket => $value) {

                $this->products[] = $value;
            }

            return self::json_data(

                $this->table_name,

                array('products' => $this->products, 'pages_details' => 'null')
            );

        }

        public function limit_products( $select_and_tables, $where, $array_data, $count)
        {

            $limit = --$array_data['number_click'] * $this->products_for_page . ',' . $this->products_for_page;

            $res = self::select_join_limit($select_and_tables, $where, $limit);

            $data = self::fetch_data_join_one($res);

            foreach ( $data as $ket => $value ) {

                $this->products[] = $value;
            }

            self::getpages( $count );

            self::get_pages_details( $this->total_pages, ++$array_data['number_click'], $array_data['type'] );

            return self::json_data(

                $this->table_name,

                array('products' => $this->products, 'pages_details' => $this->pages_details)
            );

        }

        public function get_product_details($status, $product_id)
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

            $where = 'product.company_id = company.id  AND image_product.product_id = product.id AND product.id = "' . $product_id . '"';

            $query = self::select_join($select_and_tables, $where);

            if ($query['query']->rowCount() > 0) { //  withs multiple image

                $data = self::fetch_data_join($query);

                $tmp_image = array();

                $tmp_product = array();

                $tmp_company = array();

                foreach ($data as $key => $value) {  // convert image into array .....................

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

        public function get_pages_details($total_number, $number_click, $type_link)
        {

            $this->pages_details = array('total_number' => $total_number, 'number_click' => $number_click, 'type_link' => $type_link);

        }

        public function getpages($all_row)
        {

            $this->total_pages = ceil($all_row / $this->products_for_page);

        }

        public function kot(){
            return 'ok';
       }



    }

?>
