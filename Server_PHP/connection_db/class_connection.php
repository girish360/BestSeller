<?php
class connection { // start connection class ...

    private $host='localhost'; // host

    private $root='root'; // root

    private $dbpass='';  // databse password

    private $dbname='world_sell';  // databse name

    private $db;

    public $data_array=[];

    public function __construct(){ //  constructor initalize database credencials.....................

        try {

            $this->db = new PDO("mysql:host=$this->host;dbname=$this->dbname", $this->root, $this->dbpass);

            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        }
        catch (PDOException $e) {

            print "Error!: " . $e->getMessage() . "<br/>";

            die();

        }

    }

    public function select_all( $table_name ){ // select all data from databse ......

        $query = $this->db->prepare("SELECT * FROM `$table_name` ");

        $query->execute();

        return $query;

    }

    public function select_query_dependet( $table_name , $array_where , $array_select ){  // select with array column and array where with || .........

        try {

            if ( count($array_where) > 0 ) {

                foreach ($array_where as $key => $value) {

                    $Where[] = "$key =:$key ||";
                }
            }

            $where_column = implode( $Where );

            $result_Where_column = substr( $where_column, 0,strlen( $where_column )-2 ); // all columnd that are in where ........

            $select_column = implode(',', $array_select); //  all column that should select in databse .............

            $query = $this->db->prepare("SELECT $select_column FROM `$table_name` WHERE $result_Where_column "); // query ......

            $query->execute( $array_where ); // execute with array  walue that are in where ..............

            return $query; // return query ............
        }
        catch(Exception $e){

            return $e->getMessage();
        }

    }

    public function select_dependet( $table_name , $column , $id ){  // select data dependet from another table in database .........

        $query = $this->db->prepare("SELECT * FROM `$table_name` WHERE `$column` = :id ");

        $query->bindParam(':id', $id, PDO::PARAM_INT );

        $query->execute();

        return $query;
    }
    public function select_limit( $table_name ,$start , $for_page ){ // select data from databse with limit

        $query = $this->db->prepare("SELECT * FROM `$table_name` LIMIT ".$start*$for_page." , ".$for_page."");

        $query->execute();

        return $query;
    }

    public function insert_query( $table_name , $array_data ){ // insert data in databse with array data

        try {

            if ( is_array( $array_data ) ) {

                $columns = implode(",", array_keys($array_data));  // get columns ...

                $query = $this->db->prepare("insert into `$table_name`(".$columns.")values(:".implode(', :', array_keys($array_data)).")");

                $query->execute($array_data);

                return $query;
            }
        }
        catch( Exception $e ){

            return $e->getMessage();
        }

    }

    public function delete_query( $table_name , $column , $id ){ // delete row from database with id ........

         $query = $this->db->prepare("DELETE FROM `$table_name` WHERE `$column`=:id ");

         $query->bindParam(':id',$id , PDO::PARAM_INT);

         $query->execute();

         return $query;

    }

    public function update_query( $table_name , $id , $array_data ){  // update row in database with array data .........

        try {

            if (count($array_data) > 0) {

                foreach ($array_data as $key => $value) {

                    $value = "'$value'";
                    $updates[] = "$key = $value";
                }
            }
            $implodeArray = implode(', ', $updates );

            $query = $this->db->prepare("UPDATE `$table_name` SET $implodeArray WHERE id =:id ");

            $query->bindParam(':id', $id, PDO::PARAM_INT);

            $query->execute();

            return true;
        }
        catch(Exception $e){

            return $e->getMessage();
        }

    }

    public function search_query( $table_name , $column1 , $column2 , $search_verb ){  // search data in database .......

        $like ="%".$search_verb."%";

        $query = $this->db->prepare("SELECT * from `$table_name` where `$column1` LIKE :search");

        $query->bindParam(':search' , $like , PDO::PARAM_INT );

        $query->execute();

        return $query;
    }

}

$connection = new connection();  //  declare a object for this class ....

?>