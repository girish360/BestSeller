<?php

use  server\database\database as db;

use server\services\fetch\Fetch as fetch;

use server\services\cookie\Cookie as cookie;

class Search{

    private  $tables = array('product'=>'product' , 'company'=>'company');

    private $search_results = array();

    private $recent_searches_cookie = 'recent_searches';

    public function get_search_results( $params ){

        if( $params->product ){

            $count_like = db::count_like( $this->tables['product'] , array('title'=>$params->value) );

            $number = fetch::fetch($count_like);

            $result_search = db::search_query( $this->tables['product'] , array('title'=>$params->value) ,array('title','id','image'));

            $this->search_results = fetch::fetch_data_array( $result_search );

        }
        else if( $params->company ){

            $count_like = db::count_like( $this->tables['company'] , array('name'=>$params->value) );

            $number = fetch::fetch($count_like);

            $result_search = db::search_query( $this->tables['company'] , array('name'=>$params->value) ,array('name','id','image'));

            $this->search_results = fetch::fetch_data_array( $result_search );
        }
        else{

        }

        return fetch::json_data( $this->search_results );
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