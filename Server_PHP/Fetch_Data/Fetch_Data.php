<?php

class Fetch_Data extends connection {

    public $Data_array = array();

    public $Data_dependet_array = array();

    public $dependet = array();

    public function fetch_data_array( $result_fromDB ){

        while( $result = $result_fromDB->fetch_assoc() ){

            $this->Data_array[] = $result;
        }

        return $this->Data_array;
    }


    public function json_data( $Status , $Array_data ){

        $json = json_encode( array ('status'=>$Status ,'data'=> $Array_data  ) );

        return $json;
    }


    public function fetch_data_array_dependet( $result_fromDB , $table_name_depependet , $column_depenendet , $id_dependet ){
        $nr = 0 ;

        while( $result = $result_fromDB->fetch_assoc() ){

            $this->Data_array[$nr] = $result;

            $this->Data_dependet_array = self::data_dependet( $table_name_depependet , $column_depenendet , $result[$id_dependet] );

            $this->Data_array[$nr][$table_name_depependet]= $this->Data_dependet_array;

            $nr++;
        }
        return $this->Data_array; //  return array
    }

    public function data_dependet( $table , $column , $id ){
        $this->dependet=[];
        $result_fromDB = self::select_dependet( $table, $column, $id); //select data dependet with where ....

        while( $result = $result_fromDB->fetch_assoc() ){

            $this->dependet[] = $result;
        }
        return $this->dependet;


    }

}

$fetch_data = new Fetch_Data(); // create obj ...............

?>