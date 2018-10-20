<?php

use  server\database\database as db;

use server\services\fetch\fetch as fetch;

use server\services\cookie\cookie as cookie;

use server\db\DB as database ;

use server\services\date_time\date_time as date_time;

class search{

    private $recent_searches_cookie = 'recent_searches';

    private $result = array();

    private $data_request;

    private $filter_resuest;

    public function search_in_header( $request ){

        $this->data_request = $request->data;

        $this->filter_resuest = $request->filters;

        if( $this->data_request->searchFor == 'products'){

             database::table('products')
                ->select('title','id','image','price')
                 ->like('title','%'.$this->data_request->value.'%');

            if( is_numeric( $this->filter_resuest->category )  ){ // check if user want to filter products with by category

                database::end_instance()->andWhere('category_id','=', $this->filter_resuest->category );
            }

            if( $this->filter_resuest->price != 'any_price'  ){ // check if user want to filter products with price

                if( $this->filter_resuest->price == 'expensive'){

                    database::end_instance()->andWhere('price','>=',1000 );

                }
                else if($this->filter_resuest->price == 'cheap'){

                    database::end_instance()->andWhere('price','<=',1000 );
                }
            }

            if(  $this->filter_resuest->time != 'any_time'   ){ // check if user want to filter products with time created

                if( $this->filter_resuest->time == 'past_day'){

                    database::end_instance()->andTimeStampDiff('DAY','created_at','<=','1');

                }else if($this->filter_resuest->time == 'past_week'){

                    database::end_instance()->andTimeStampDiff('WEEK','created_at','<=','1');

                }else if($this->filter_resuest->time == 'past_month'){

                    database::end_instance()->andTimeStampDiff('MONTH','created_at','<=','1');

                }else if($this->filter_resuest->time == 'past_hour'){

                    database::end_instance()->andTimeStampDiff('HOUR','created_at','<=','1');
                }
            }

        }
        else if(  $this->data_request->searchFor == 'supplier'){

            $this->result = database::table('suppliers')
                ->select('name','id','image')
                ->like('name','%'. $this->data_request->value.'%');

            if( is_numeric( $this->filter_resuest->category )  ){ // check if user want to filter products with by category

                database::end_instance()->andWhere('category_id','=', $this->filter_resuest->category );
            }

            if( $this->filter_resuest->price != 'any_price'  ){ // check if user want to filter products with price

                if( $this->filter_resuest->price == 'expensive'){

                    database::end_instance()->andWhere('price','>=',1000 );

                }
                else if($this->filter_resuest->price == 'cheap'){

                    database::end_instance()->andWhere('price','<=',1000 );
                }
            }

            if(  $this->filter_resuest->time != 'any_time'   ){ // check if user want to filter products with time created

                if( $this->filter_resuest->time == 'past_day'){

                    database::end_instance()->andTimeStampDiff('DAY','created_at','<=','1');

                }else if($this->filter_resuest->time == 'past_week'){

                    database::end_instance()->andTimeStampDiff('WEEK','created_at','<=','1');

                }else if($this->filter_resuest->time == 'past_month'){

                    database::end_instance()->andTimeStampDiff('MONTH','created_at','<=','1');

                }else if($this->filter_resuest->time == 'past_hour'){

                    database::end_instance()->andTimeStampDiff('HOUR','created_at','<=','1');
                }
            }
        }
        $this->result = database::end_instance()->get();

        if( count( $this->result ) == 0 ){

            return fetch::json_data(false);

        }else{

            return fetch::json_data( $this->result );
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