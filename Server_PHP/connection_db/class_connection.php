<?php
class connection{ // start connection class ...

    private $host='localhost'; // host
    private $root='root'; // root
    private $dbpass='';  // databse password
    private $dbname='world_sell';  // databse name

    public $data_array=[];

    public function __construct(){ //  constructor initalize database credencials.....................

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

    public function select_all( $table_name ){ // select all data from databse ......

        $query = $this->db->prepare("SELECT * FROM `$table_name` ");

        $query->execute();

        $result = $query->get_result();

        $query->close();

        return $result;

    }

    public function select_dependet( $table_name , $column ,$id){  // select data dependet from another table in database .........

        $query = $this->db->prepare("SELECT * FROM `$table_name` WHERE `$column` = ? ");

        $query->bind_param('i',$id);

        $query->execute();

        $result = $query->get_result();

        $query->close();

        return $result;
    }
    public function select_limit( $table_name ,$start , $for_page ){ // select data from databse with limit

        $query = $this->db->prepare("SELECT * FROM `$table_name` LIMIT ".$start*$for_page." , ".$for_page."");

        $query->execute();

        $result = $query->get_result();

        $query->close();

        return $result;
    }

    public function insert_query( $table_name , $array_data ){ // insert data in databse

        try {

            if ( is_array( $array_data ) ) {

                $columns = implode(",", array_keys($array_data));  // get columns ...

                $values = implode("','", array_values($array_data)); // get values ....

                $this->db->query("insert into `$table_name`(".$columns.")values('$values')");

                return $values;
            }
        }
        catch( Exception $e ){

            return $e->getMessage();
        }

    }

    public function delete_query( $table_name , $column , $id ){ // delete row from database ........

         $query = $this->db->prepare("DELETE FROM `$table_name` WHERE `$column`=? ");

         $query->bind_param('i',$id);

         $query->execute();

         $result = $query->get_result();

        $query->close();

        return $result;

    }

    public function update_query( $table_name , $column ,$id , $array_data ){  // update row in database .........

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

    public function search_query( $table_name , $column1 , $column2 , $search_verb ){  // search data in database .......

        $like ="%".$search_verb."%";

        $query = $this->db->prepare("SELECT * from `$table_name` where `$column1` LIKE ?");

        $query->bind_param('s' , $like );

        $query->execute();

        $result = $query->get_result();

        $query->close();

        return $result;
    }

}

$connection = new connection();  //  declare a object for this class ....

?>