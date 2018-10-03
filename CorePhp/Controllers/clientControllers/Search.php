<?php

use  server\database\database as db;

use server\services\fetch\Fetch as fetch;

use server\services\cookie\Cookie as cookie;

use server\db\DB as database ;

class Search{

    private  $tables = array('products'=>'products' , 'suppliers'=>'suppliers');

    private $search_results = array();

    private $recent_searches_cookie = 'recent_searches';

    private $result = array();

    public function search_in_header( $params ){

        if( $params->product ){

            $this->result = database::table('products')
                ->select('title','products.id','products.image','name')
                ->join('suppliers','products.supplier_id','=','suppliers.id')
                ->like('title','%'.$params->value.'%')
                ->get();

             if( count( $this->result ) == 0 ){

                 return fetch::json_data(false);

             }else{
                 return fetch::json_data( $this->result );
             }

        }
        else if( $params->company ){

            $this->result = database::table('suppliers')
                ->select('name','id','image')
                ->like('name','%'.$params->value.'%')
                ->get();

            if( count( $this->result ) == 0 ){

                return fetch::json_data(false);

            }else{

                return fetch::json_data( $this->result );
            }

        }
    }

    public function get_recent_searches( $params ){

        if( cookie::check_cookie( $this->recent_searches_cookie ) ){



        }else{

            return fetch::json_data( [] );

        }



    }

    public function save_search( $params ){

    }

    public function delete_search($params){


    }

}

?>