<?php

include '../connection_db/class_connection.php';

class Fetch_Data extends connection {

    public $Data_array = array();

    public $Data_dependet_array = array();

    public $dependet = array();

    public function fetch_data_array( $result_fromDB ){

        $this->Data_array=array();

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

        $this->Data_array = array();

        while( $result = $result_fromDB->fetch( PDO::FETCH_ASSOC )  ){

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

        while( $result = $result_fromDB->fetch( PDO::FETCH_ASSOC)  ){

            $this->dependet[] = $result;
        }
        return $this->dependet;
    }

    public function fetch_data_dependet_cookie( $array_ID , $array_table , $array_table_dependet ){

        $nr = 0;

        $this->Data_array = array();

        foreach ( $array_ID as $value ){

            $array_where = array( $array_table['column'] => $value );

           $result = self::select_dependet_or(  $array_table['table_name'], $array_where, $array_table['array_select'] );

            while ( $row = $result->fetch( PDO::FETCH_ASSOC )  ) {

                $this->Data_array[$nr] = $row;

                $where_dependet = array( $array_table_dependet['column_dependet'] => $row[ $array_table_dependet['column'] ]);

                $this->Data_dependet_array = self::data_dependet(

                    $array_table_dependet['table_name'],
                    $where_dependet,
                    $array_table_dependet['array_select_dependet']

                );

                $this->Data_array[$nr][$array_table_dependet['table_name']] = $this->Data_dependet_array;

            }
            $nr++;
        }

        return $this->Data_array; //  return array

    }

    public function fetch_data_cookie( $array_ID , $array_table ){
        $nr = 0;

        $this->Data_array = array();

        foreach ( $array_ID as $value ){

            $array_where = array( $array_table['column'] => $value );

            $result = self::select_dependet_or(  $array_table['table_name'], $array_where, $array_table['array_select'] );

            while ( $row = $result->fetch( PDO::FETCH_ASSOC )  ) {

                $this->Data_array[$nr] = $row;

            }
            $nr++;
        }

        return $this->Data_array; //  return array

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