<?php
class connection{

    private $host='localhost';
    private $root='root';
    private $dbpass='';
    private $dbname='world_sell';

    public function __construct(){
        if(!isset($this->db)){
            $conn=new mysqli($this->host,$this->root,$this->dbpass,$this->dbname);
            if($conn->connect_error){
                die('error in connection db'.$conn->connect_error);

            }
            else{
                $this->db=$conn;
            }

        }

    }

    public function select_query($script){

        $res=$this->db->query($script);
        return $res;

    }

    public function insert_query(){

    }

    public function delete_query(){

    }

    public function fetch_data_array($query){

    }
    public function fetch_data_array_dependent($query){

    }


}

?>