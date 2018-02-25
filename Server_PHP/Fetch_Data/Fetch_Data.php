<?php

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

    public function fetch_data_array_dependet( $result_fromDB , $table_name_dependet , $column_depenendet , $id_dependet ){

        $nr = 0 ;

        while( $result = $result_fromDB->fetch( PDO::FETCH_ASSOC)  ){

            $this->Data_array[$nr] = $result;

            $this->Data_dependet_array = self::data_dependet( $table_name_dependet , $column_depenendet , $result[$id_dependet] );

            $this->Data_array[$nr][$table_name_dependet]= $this->Data_dependet_array;

            $nr++;
        }
        return $this->Data_array; //  return array
    }

    public function data_dependet( $table , $column , $id ){

        $this->dependet=[];

        $result_fromDB = self::select_dependet( $table, $column, $id); //select data dependet with where ....

        while( $result = $result_fromDB->fetch( PDO::FETCH_ASSOC)  ){

            $this->dependet[] = $result;
        }
        return $this->dependet;
    }

    public function fetch_oneRow_dependet( $array_wishID , $table_name , $column , $table_name_dependet ,$column_dependet ,$id_dependet ){

        $nr = 0 ;

        foreach ( $array_wishID as $value ){

           $result = self::select_dependet( $table_name ,$column , $value );

            while ( $row = $result->fetch( PDO::FETCH_ASSOC)  ) {

                $this->Data_array[$nr] = $row;

                $this->Data_dependet_array = self::oneRow_dependet( $table_name_dependet , $column_dependet , $row[$id_dependet] );

                $this->Data_array[$nr][$table_name_dependet] = $this->Data_dependet_array;

            }
            $nr++;
        }

        return $this->Data_array; //  return array

    }

    public function oneRow_dependet(  $table_name , $column , $id  ){

        $this->dependet=[];

        $result_fromDB = self::select_dependet( $table_name , $column , $id ); //select data dependet with where ....

        while( $row = $result_fromDB->fetch( PDO::FETCH_ASSOC)  ){

            $this->dependet[] = $row;
        }
        return $this->dependet;
    }

    public function  convert_to_array( $data ){

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

$fetch_data = new Fetch_Data(); // create obj ...............

?>