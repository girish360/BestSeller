<?php

namespace server\services\fetch;

use server\database\database as db;

class Fetch {

    public static $Data_array = array();

    public static $Data_dependet_array = array();

    public static $dependet = array();

    public function __construct()
    {

    }

    public function fetch_data_array( $result_fromDB ){

         self::$Data_array=[];

        while( $result = $result_fromDB->fetch( \PDO::FETCH_ASSOC )  ){

             self::$Data_array[] = $result;
        }

        return  self::$Data_array;
    }

    public function fetch( $result_fromDB ){

        $result = $result_fromDB->fetch( \PDO::FETCH_ASSOC );

        return  $result;
    }

    public static function json_data(   $data ){

        $json = json_encode( $data );

        return $json;
    }

    public function fetch_data_array_dependet( $result_fromDB , $select_dependet , $array_dependet ){

        $nr = 0 ;

         self::$Data_array = [];

        while( $result = $result_fromDB->fetch( \PDO::FETCH_ASSOC ) ) {

             self::$Data_array[ $nr ] = $result;

            $array_where = array( $array_dependet['column_dependet']=>$result[$array_dependet['column']] );

            self::$Data_dependet_array = self::data_dependet( $array_dependet['table_name'] , $array_where , $select_dependet );

            self::$Data_array[ $nr ][ $array_dependet['table_name'] ]= self::$Data_dependet_array;

            $nr++;
        }

        return  self::$Data_array; //  return array
    }

    public function data_dependet( $table_name , $array_where , $array_select ){

       self::$dependet=[];

        $result_fromDB = db::select_dependet_or( $table_name , $array_where , $array_select ); //select data dependet with where ....

        $result= $result_fromDB->fetchAll(\PDO::FETCH_ASSOC );

       self::$dependet = $result;

        return self::$dependet;
    }

    public static function fetch_data_cookie( $array_tables, $array_ID  ){

        self::$Data_array = [];

        $where='';

        foreach ( $array_ID as $array_key => $array ) {

            $where.= 'product.id='.$array->id.' AND product.company_id = company.id OR ';

        }

        $where = substr($where , 0 , strlen($where)-3);

        $res = db::select_join( $array_tables, $where );

        if ( $res['query']->rowCount() >= 1 ) {

            $data  = self::fetch_data_join_one( $res );

            foreach ( $data as $ket => $value ){

                self::$Data_array[] = $value;
            }

        }

        return   self::$Data_array ;
    }

    public function fetch_data_join( $array_query ){
        self::$Data_array = [];
        $output = array();
        $tmp = array();
        $first_table='';
        while ($row = $array_query['query']->fetch( \PDO::FETCH_ASSOC ) ) {
            $table_nr = 0;

            foreach ( $array_query['fetch'] as $table => $columns ) {
                $table_nr++;

                if( $table_nr == 1 ){

                    $first_table = $table;
                }
                if( in_array( $row[$first_table.'_id'], $tmp ) ){

                    foreach ( $columns as $key_column => $column ) {

                        if( $table_nr > 1 ){

                            $output[$row[$first_table.'_id']][$table][$row[$table.'_id']][$column] = $row[$column];
                        }
                    }
                }
                else{

                    foreach ( $columns as $key_column => $column ) {

                        if( $table_nr > 1 ){

                            $output[$row[$first_table.'_id']][$table][$row[$table.'_id']][$column] = $row[$column];
                        }else{
                            $output[$row[$first_table.'_id']][$column] = $row[$column];

                            array_push( $tmp, $row[$first_table.'_id'] );
                        }
                    }
                }

            }
        }
        return  $output;  // return array ...........
    }

    public function fetch_data_join_one( $array_query ){
        self::$Data_array = [];
        $output = array();
        $tmp = array();
        $first_table='';
        while ($row = $array_query['query']->fetch( \PDO::FETCH_ASSOC ) ) {
            $table_nr = 0;

            foreach ( $array_query['fetch'] as $table => $columns ) {
                $table_nr++;

                if( $table_nr == 1 ){

                    $first_table = $table;
                }
                if( in_array( $row[$first_table.'_id'], $tmp ) ){

                    foreach ( $columns as $key_column => $column ) {

                        if( $table_nr > 1 ){

                            $output[$row[$first_table.'_id']][$table][$column] = $row[$column];
                        }
                    }
                }
                else{

                    foreach ( $columns as $key_column => $column ) {

                        if( $table_nr > 1 ){

                            $output[$row[$first_table.'_id']][$table][$column] = $row[$column];
                        }else{
                            $output[$row[$first_table.'_id']][$column] = $row[$column];

                            array_push( $tmp, $row[$first_table.'_id'] );
                        }
                    }
                }
            }
        }
        return  $output;  // return array ...........
    }

    public static function  convert_to_array( $data ){

         self::$Data_array = array();

        foreach ( $data as $key => $value )
        {
            if (is_object($value))
            {
                 self::$Data_array[$key]=$value;
            }
            if (is_array($value))
            {
                 self::$Data_array[$key]=$value;
            }
            else
            {
                 self::$Data_array[$key]=$value;
            }
        }

        return  self::$Data_array;
    }

}

?>