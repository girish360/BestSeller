<?php


class Home extends Fetch_Data {

    private $table_category ='sub_category';

    private $table_products = 'product';

    private $select_and_tables = array(  // array with t6ables and respective columns

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

    private $where;

    private $products_for_category = 20;

    private $category_for_load = 5;

    private $Categories = array();

    private $products = array();

    private $categories_products = array();

    public function get_categories ( $status , $data_object  ){

        $array_data = self::convert_to_array( $data_object );

        $count = self::count('sub_category');

        if( $count  >= 5 ){

            $query =self::select_limit( $this->table_category , array('name','id' ,'image') ,$array_data['current_page'] ,$this->category_for_load);

        }else{

            $query = self::select_all($this->table_category , array('name','id' ,'image'));
        }

        $this->Categories = $query->fetchAll();

         self::dependet_products( $this->Categories , $array_data );

         foreach ( $this->categories_products as $key => $category ){

             $result [] = $category;
         }

        return self::json_data( $status ,  $result );
    }


    public function dependet_products( $array_categories ,$array_data ){  // get all products .....................................

        foreach ( $array_categories as $key => $category ){

           $this->products = [];

           $this->categories_products[$category['id']] = $category;

           $count = self::count_where( $this->table_products, array( "category_id" => $category['id'] ));

           $this->where = 'product.company_id = company.id AND product.category_id = "' . $category['id'] . '"';

           if ( $count > 0 ) {

               if ( $count <= $this->products_for_category ) {

                   $this->products = self::all_products();

               } else {

                   self::limit_products( $array_data );

                   $this->categories_products[$category['id']]['products'] = $this->products;

                   $this->categories_products[$category['id']]['current_page'] = $array_data['current_page'];
               }
           }
       }
    }

    public function all_products( )
    {

        $this->products =[];

        $res = self::select_join( $this->select_and_tables, $this->where );

        $data = self::fetch_data_join_one( $res );

        foreach ( $data as $ket => $value ) {

            $this->products[] = $value;
        }



    }

    public function limit_products(  $array_data )
    {

        $this->products =[];

        $limit = $array_data['current_page'] * $this->products_for_category . ',' . $this->products_for_category;

        $res = self::select_join_limit( $this->select_and_tables, $this->where, $limit );

        $data = self::fetch_data_join_one($res);

        foreach ( $data as $ket => $value ) {

            $this->products[] = $value;
        }

    }

    public function more_products(  $status , $data_object  ){

        $tmp_products = [];

        $data_array = self::convert_to_array( $data_object );

        $this->where = 'product.company_id = company.id AND product.category_id = "' . $data_array['category'] . '"';

        self::limit_products( $data_array );

        $tmp_products['current_page'] =  $data_array['current_page'];

        $tmp_products['category_id'] = $data_array['category'];

        $tmp_products['products'] = $this->products;

        return self::json_data( $status ,  $tmp_products );


    }




}

?>