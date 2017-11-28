<?php

class Fetch_Data extends connection {

    public $Data_array = [];

    public $Data_dependet_array = [];

    public $dependet = [];

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


    public function fetch_data_array_dependet( $result_fromDB , $tb_name_dep , $column_dep , $id ){

        while( $result = $result_fromDB->fetch_assoc() ){

            $this->Data_array[] = $result;

            $this->Data_dependet_array = self::data_dependet( $tb_name_dep , $column_dep , $result[$id] );

            $this->Data_array[] =  $this->Data_dependet_array;
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