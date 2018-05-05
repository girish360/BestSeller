<?php

include '../connection_db/class_connection.php';

class Fetch_Data extends connection {

    public $Data_array = array();

    public $Data_dependet_array = array();

    public $dependet = array();

    public function __construct()
    {
        parent::__CONSTRUCT();
    }

    public function fetch_data_array( $result_fromDB ){

        $this->Data_array=[];

        while( $result = $result_fromDB->fetch( PDO::FETCH_ASSOC )  ){

            $this->Data_array[] = $result;
        }

        return $this->Data_array;
    }

    public function json_data( $Status , $Array_data ){

        $json = json_encode( array ('status'=>$Status ,'data'=> $Array_data  ) );

        return $json;
    }

    public function fetch_data_array_dependet( $result_fromDB , $select_dependet , $array_dependet ){

        $nr = 0 ;

        $this->Data_array = [];

        while( $result = $result_fromDB->fetch( PDO::FETCH_ASSOC ) ) {

            $this->Data_array[ $nr ] = $result;

            $array_where = array( $array_dependet['column_dependet']=>$result[$array_dependet['column']] );

            $this->Data_dependet_array = self::data_dependet( $array_dependet['table_name'] , $array_where , $select_dependet );

            $this->Data_array[ $nr ][ $array_dependet['table_name'] ]= $this->Data_dependet_array;

            $nr++;
        }

        return $this->Data_array; //  return array
    }

    public function data_dependet( $table_name , $array_where , $array_select ){

        $this->dependet=[];

        $result_fromDB = self::select_dependet_or( $table_name , $array_where , $array_select ); //select data dependet with where ....

        $result= $result_fromDB->fetchAll(PDO::FETCH_ASSOC );

        $this->dependet = $result;

        return $this->dependet;
    }

    public function fetch_data_cookie( $array_tables, $array_ID  ){

        $this->Data_array = [];
        $where='';

        foreach ( $array_ID as $array_key => $array ) {

            $where.= 'product.id='.$array->id.' AND product.company_id = company.id OR ';

        }

        $where = substr($where , 0 , strlen($where)-3);

        $res = self::select_join( $array_tables, $where );

        if ( $res['query']->rowCount() >= 1 ) {

            $data  = self::fetch_data_join_one( $res );

            foreach ( $data as $ket => $value ){

                $this->Data_array[] = $value;
            }

        }

        return   $this->Data_array ;
    }

    public function fetch_data_join( $array_query ){
        $this->Data_array = [];
        $output = array();
        $tmp = array();
        $first_table='';
        while ($row = $array_query['query']->fetch( PDO::FETCH_ASSOC ) ) {
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
        $this->Data_array = [];
        $output = array();
        $tmp = array();
        $first_table='';
        while ($row = $array_query['query']->fetch( PDO::FETCH_ASSOC ) ) {
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

    public function  convert_to_array( $data ){

        $this->Data_array = array();

        foreach ( $data as $key => $value )
        {
            if (is_object($value))
            {
                $this->Data_array[$key]=$value;
            }
            if (is_array($value))
            {
                $this->Data_array[$key]=$value;
            }
            else
            {
                $this->Data_array[$key]=$value;
            }
        }

        return $this->Data_array;
    }

}

?>