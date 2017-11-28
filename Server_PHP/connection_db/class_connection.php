<?php
class connection{

    private $host='localhost';
    private $root='root';
    private $dbpass='';
    private $dbname='world_sell';

    public $data_array=[];

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

    public function select_all( $table_name ){

        $query = $this->db->prepare("SELECT * FROM `$table_name` ");

        $query->execute();

        $result = $query->get_result();

        $query->close();

        return $result;

    }

    public function select_dependet( $table_name , $column ,$id){
        $query = $this->db->prepare("SELECT * FROM `$table_name` WHERE `$column` = ? ");

        $query->bind_param('i',$id);

        $query->execute();

        $result = $query->get_result();

        $query->close();

        return $result;
    }
    public function select_limit( $table_name ,$start , $for_page ){

        $query = $this->db->prepare("SELECT * FROM `$table_name` LIMIT ".$start*$for_page." , ".$for_page."");

        $query->execute();

        $result = $query->get_result();

        $query->close();

        return $result;
    }

    public function insert_query(){

    }

    public function delete_query( $table_name , $column , $id ){

         $query = $this->db->prepare("DELETE FROM `$table_name` WHERE `$column`=? ");

         $query->bind_param('i',$id);

         $query->execute();

         $result = $query->get_result();

        $query->close();

        return $result;

    }

    public function update_query( $table_name , $column ,$id , $array_data ){

        $stmt = $this->db->prepare("UPDATE `$table_name`
            SET filmName = ?, 
            filmDescription = ?, 
            filmImage = ?,  
            filmPrice = ?,  
            filmReview = ?  
            WHERE `$column` = ?");

        $stmt->bind_param('sssdii',
            $_POST['filmName'],
            $_POST['filmDescription'],
            $_POST['filmImage'],
            $_POST['filmPrice'],
            $_POST['filmReview'],
           $id);
        $stmt->execute();
        $stmt->close();
    }

    public function search_query( $table_name , $column1 , $column2 , $search ){

        $like ="%".$search."%";

        $query = $this->db->prepare("SELECT * from `$table_name` where `$column1` LIKE ?");

        $query->bind_param('s' , $like );

        $query->execute();

        $result = $query->get_result();

        $query->close();

        return $result;
    }

}

$connection = new connection();
?>