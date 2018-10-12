<?php

namespace server\database;

use \PDO;

class database { // start connection class ...

    private static $host='localhost'; // host

    private static $root='root'; // root

    private  static $dbpass='';  // databse password

    private static $dbname='world_sell';  // databse name

    private static $db;

    public function conn(){ //  constructor config database credencials.....................

        self::$db = null;

        try {

            self::$db = new PDO('mysql:host=localhost;dbname=world_sell', 'root', '');

            self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        }
        catch (PDOException $e) {

            print "Error!: " . $e->getMessage() . "<br/>";

            die();
        }

        return self::$db;
    }

    public function select( $table_name , $array_select ){ // select all data from databse ......

        $select_columns = self::select_columns( $array_select );

        $query =self::conn()->prepare("SELECT $select_columns FROM `$table_name` ");

        $query->execute();

        return $query;

    }
    public function select_where( $table_name , $array_select , $array_where ){ // select all data from databse ......

        $select_columns = self::select_columns( $array_select );

        $where_columns = self::where_columns_and( $array_where );

        $query =self::conn()->prepare("SELECT $select_columns FROM `$table_name` WHERE $where_columns");

        $query->execute( $array_where );

        return $query;

    }

    public function select_limit( $table_name , $array_select ,$start , $for_page ){ // select data from databse with limit

        $select_column = implode(',', $array_select); //  all column that should select in databse .............

        $query =self::conn()->prepare("SELECT $select_column FROM `$table_name` LIMIT ".$start*$for_page." , ".$for_page."");

        $query->execute();

        return $query;
    }

    public function select_limit_where( $table_name , $array_select , $array_where , $start , $for_page ){ // select data from databse with limit

        $where_columns = self::where_columns_or( $array_where );

        $select_column = self::select_columns( $array_select );

        $query =self::conn()->prepare("SELECT $select_column FROM `$table_name` WHERE $where_columns LIMIT ".$start*$for_page." , ".$for_page."");

        $query->execute();

        return $query;
    }

    public function select_join_limit( $array_select_tables ,$where ,$limit ){  // select data with join tables
        $Tables = array(); // tables array
        $Columns = array();  // Columns array
        $fetch = array(); // tables with columns

        foreach ( $array_select_tables as $table => $columns ) { // loop tables

            $Tables[]=$table; // build array with tabel name .............

            foreach ( $columns as $column ){ // loop column

                $nr_point=0;

                for($i = 0 ; $i < strlen($column) ; $i++ ){  // loop string column

                    if( $column[$i] == '.' ){

                        break;
                    }

                    $nr_point++;
                }

                $column_string = substr($column, $nr_point+1,strlen($column)); // get only column name ,because it was together with table name ...............

                $Columns[] = $column." as ". $table ."_".$column_string; //build array with select columns

                $fetch[$table][] = $table ."_".$column_string; // array with tables and the respective columns
            }

        }

        $Columns = implode(',', $Columns); // get select columns from array .....................

        $Tables = implode(',', $Tables); // get table name from array ........

        $query =self::conn()->prepare("SELECT $Columns FROM $Tables WHERE $where LIMIT $limit "); // prepare query

        $query->execute(); // execute query ...............

        return  array( 'query'=>$query , 'fetch'=>$fetch ); // return query and tables and the respective columns

    }

    public function select_join( $array_select_tables ,$where ){  // select data with join tables

        $Tables = array(); // tables array
        $Columns = array();  // Columns array
        $fetch = array(); // tables with columns

        foreach ( $array_select_tables as $table => $columns ) { // loop tables

            $Tables[]=$table; // build array with tabel name .............

            foreach ( $columns as $column ){ // loop column

                $nr_point=0;

                for( $i = 0 ; $i < strlen($column) ; $i++ ){  // loop string column

                    if( $column[$i] == '.' ){
                        break;
                    }

                    $nr_point++;
                }

                $column_string = substr($column, $nr_point+1,strlen($column)); // get only column name ,because it was together with table name ...............

                $Columns[] = $column." as ". $table ."_".$column_string; //build array with select columns

                $fetch[$table][] = $table ."_".$column_string; // array with tables and the respective columns
            }

        }

        $Columns = implode(',', $Columns); // get select columns from array .....................

        $Tables = implode(',', $Tables); // get table name from array ........

        $query = self::conn()->prepare("SELECT $Columns FROM $Tables WHERE $where "); // prepare query

        $query->execute(); // execute query ...............

        return  array( 'query'=>$query , 'fetch'=>$fetch ); // return query and tables and the respective columns

    }



    public  function count( $table_name ){

        $query =self::conn()->prepare( "SELECT COUNT(*) FROM `$table_name`");

        $query->execute();

        $count = $query->fetchColumn();

        return $count;
    }

    public  function count_where( $table_name , $array_where ){

        $where_columns = self::where_columns_and( $array_where );

        $query = self::conn()->prepare( "SELECT COUNT(*) FROM `$table_name` WHERE $where_columns ");

        $query->execute( $array_where );

        $count = $query->fetchColumn();

        return $count;

    }

    public  function count_like( $table_name  ,$array_where  ){

        $where = array();

        if ( count( $array_where) > 0 ) {

            foreach ( $array_where as $key => $value ) {

                $where[] = "$key LIKE :$key ||";
            }
        }

        $where = implode( $where );

        $where = substr( $where, 0 , strlen( $where ) -2 ); // all columnd that are in where ........

        $query = "SELECT COUNT(*)as count FROM `$table_name` WHERE $where";

        $query = self::conn()->prepare($query);

        foreach ($array_where as $key => $value) {

            $query->bindValue( $key , '%' . $value . '%');

        }

        $query->execute();

        return $query;
    }

    public function select_dependet_or( $table_name , $array_where , $array_select ){  // select with array column and array where with || .........

        try {

            $where_columns = self::where_columns_or( $array_where );

            $select_column = self::select_columns( $array_select );

            $query =self::conn()->prepare("SELECT $select_column FROM `$table_name` WHERE $where_columns "); // query ......

            $query->execute( $array_where ); // execute with array  walue that are in where ..............

            return $query; // return query ............
        }
        catch(Exception $e){

            return $e->getMessage();
        }

    }

    public function select_dependet_and( $table_name , $array_where , $array_select ){  // select with array column and array where with || .........

        try {

            $where_columns = self::where_columns_and( $array_where );

            $select_column = self::select_columns( $array_select );

            $query = self::conn()->prepare("SELECT $select_column FROM `$table_name` WHERE $where_columns "); // query ......

            $query->execute( $array_where ); // execute with array  walue that are in where ..............

            return $query; // return query ............
        }
        catch(Exception $e){

            return $e->getMessage();
        }

    }

    public function insert_query( $table_name , $array_data ){ // insert data in databse with array data

        try {

            if ( is_array( $array_data ) ) {

                $columns = implode(",", array_keys($array_data));  // get columns ...

                $query = self::conn()->prepare("insert into `$table_name`(".$columns.")values(:".implode(', :', array_keys($array_data)).")");

                $query->execute($array_data);

                return $query;
            }
        }
        catch( Exception $e ){

            return $e->getMessage();
        }

    }

    public function delete_query( $table_name , $array_where_columns){ // delete row from database with id ........

        $where_columns = self::where_columns_or( $array_where_columns );

        $query = self::conn()->prepare("DELETE FROM `$table_name` WHERE $where_columns " );

        $query->execute( $array_where_columns );

        return $query;

    }

    public function update_query( $table_name  , $array_data , $array_where_columns ){  // update row in database with array data .........

        try {
            $updates = array();

            if ( count( $array_data ) > 0 ) {

                foreach ( $array_data as $key => $value ) {

                    $value = "'$value'";

                    $updates[] = "$key = $value";
                }
            }

            $set = implode(', ', $updates );

            $where = self::where_columns_or( $array_where_columns );

            $query = self::conn()->prepare(" UPDATE `$table_name` SET $set WHERE $where " );

            $query->execute( $array_where_columns );

            return $query->rowCount();
        }
        catch( Exception $e ){

            return $e->getMessage();
        }

    }

    public function search_query( $table_name, $array_where , $array_select ){

        $where = array();

        if ( count( $array_where) > 0 ) {

            foreach ( $array_where as $key => $value ) {

                $where[] = "$key LIKE :$key ||";
            }
        }

        $where = implode( $where );

        $where = substr( $where, 0 , strlen( $where ) -2 ); // all columnd that are in where ........

        $select = self::select_columns($array_select);

        $query = "SELECT $select FROM `$table_name` WHERE $where";

        $query = self::conn()->prepare($query);

        foreach ( $array_where as $key => $value ) {

            $query->bindValue( $key , '%' . $value . '%');

        }

        $query->execute();

        return $query;
    }

    public function search_query_limit( $table_name, $array_where , $array_select ){

        $where = array();

        if ( count( $array_where) > 0 ) {

            foreach ( $array_where as $key => $value ) {

                $where[] = "$key LIKE :$key ||";
            }
        }

        $where = implode( $where );

        $where = substr( $where, 0 , strlen( $where ) -2 ); // all columnd that are in where ........

        $select = self::select_columns($array_select);

        $query = "SELECT $select FROM `$table_name` WHERE $where";

        $query = self::conn()->prepare($query);

        foreach ( $array_where as $key => $value ) {

            $query->bindValue( $key , '%' . $value . '%');

        }

        $query->execute();

        return $query;
    }

    public function where_columns_or ( $array_where ){

        if ( count($array_where) > 0 ) {

            foreach ($array_where as $key => $value) {

                $Where[] = "$key =:$key ||";
            }
        }

        $where_columns = implode( $Where );

        $result_Where_columns = substr( $where_columns, 0,strlen( $where_columns )-2 ); // all columnd that are in where ........

        return $result_Where_columns ;

    }
    public function where_columns_and ( $array_where ){

        if ( count( $array_where) > 0 ) {

            foreach ( $array_where as $key => $value ) {

                $Where[] = "$key =:$key &&";
            }
        }

        $where_columns = implode( $Where );

        $result_Where_columns = substr( $where_columns, 0,strlen( $where_columns )-2 ); // all columnd that are in where ........

        return $result_Where_columns;

    }


    public function  select_columns( $array_select ){

         $select_columns  = implode(',', $array_select ); //  all column that should select in databse .............

         return $select_columns;
    }

}



?>