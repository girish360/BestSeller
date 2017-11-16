<?php

class Fetch_Data{

    public function fetch_data_array($query){

    }
    public function fetch_data_array_dependent($query){

    }

    public function json_data( $Status , $Array_data ){

        $json = json_encode( array ( 'status'=>$Status , $Array_data )  , JSON_FORCE_OBJECT );

        return $json;
    }

}

$fetch_data = new Fetch_Data(); // create obj ...............
?>