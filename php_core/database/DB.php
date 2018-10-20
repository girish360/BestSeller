<?php

namespace server\db;

use \PDO;

use \Exception;

use \PDOException;

class DB { //class of databse can build query and execute it to get data from databse ...............

    private static $host='localhost'; // host

    private static $root='root'; // root

    private static $dbpass='';  // databse password

    private static $dbname='world_sell';  // databse name

    private static $db;  // db con

    private $table = false;

    private $select = 'select'; // selecte statments

    private $from = ' from ';  // tables

    private $where = false; // where clause

    private $groupby = false; // group by

    private $having = false; // havin

    private $orderby = false; // order by

    private $limit = false; // limit

    private $insert = false;

    private $delete = false;

    private $update = false;

    public $prepare = false; // prepare query

    public $data = array(); // data in  execute query

    private static $instances = array(); //  objects of class

    private static $class = __CLASS__;

    public function conn(){ //  constructor config database credencials.....................

        self::$db = null;

        try {

            self::$db = new PDO('mysql:host=localhost;dbname=world_sell', 'root', '');

            self::$db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

            self::$db->setAttribute( PDO::ATTR_EMULATE_PREPARES, false );

        }
        catch (PDOException $e) {

            print "Error!: " . $e->getMessage() . "<br/>";

            die();
        }

        return self::$db;
    }

    private static function generic_instance( $instance_name ){

        self::$instances[$instance_name] =  new self::$class();

        return  self::$instances[$instance_name];
    }

    public static function end_instance(){

        $number = 1;

        $count = count( self::$instances );

        foreach ( self::$instances as $key => $value ) {

            if( $number == $count ){

                return self::$instances[$key];
            }

            $number++;

        }

        return false;

    }

    private static function delete_instance( $instance ){

        $key ='';

        if( array_key_exists($instance, self::$instances )  ){ // if exists DESC in arguments .......

            unset( self::$instances[$instance] );

        }


    }

    public static function table( $table_name ){ // table method init a instance of this class ..................

        $instance = self::generic_instance( __FUNCTION__ );

        $instance->from .=' '.$table_name;

        $instance->table = $table_name ;



        return $instance;

    }

    public function from( $from ){

        $this->table = $from;

        $this->from .=' '.$this->table;

        return self::end_instance();
    }

    public function select(){ //select method  wait for a list of columns that you want to get from db as parameters

        $arg_list = func_get_args();

        if( self::if_empty_select() ){

            $this->select .=' '.implode( ',', $arg_list );

        }else{

            $this->select .=','.implode( ',', $arg_list );
        }

        return self::end_instance();

    }

    public function count(){

        $arg_list = func_get_args();

        self::set_select_operators( $arg_list , 'count' );

        return self::end_instance();

    }

    public function sum(){

        $arg_list = func_get_args();

        if( count($arg_list) != 0 ){

            self::set_select_operators( $arg_list , 'sum' );


        }else{

            throw new Exception("can't not set  sum  operator without a column", 1);
        }


        return self::end_instance();
    }

    public function max(){

        $arg_list = func_get_args();

        if( count($arg_list) != 0 ){

            self::set_select_operators( $arg_list , 'max' );


        }else{

            throw new Exception("can't not set max  operator without a column", 1);
        }

        return self::end_instance();

    }

    public function min(){

        $arg_list = func_get_args();

        if( count($arg_list) != 0 ){

            self::set_select_operators( $arg_list , 'min' );


        }else{

            throw new Exception("can't not set min  operator without a column", 1);
        }

        return self::end_instance();

    }

    public function avg(){

        $arg_list = func_get_args();

        if( count($arg_list) != 0 ){

            self::set_select_operators( $arg_list , 'avg' );


        }else{

            throw new Exception("can't not avg  operator without a column", 1);
        }

        return self::end_instance();

    }

    public function join($addtable,$primarykey,$operator,$foreignkey){  // joind method add multiple tables in query ..........

        $this->from .= " join " .$addtable .' on '.$primarykey.' '.$operator.' '.$foreignkey ;


        return self::end_instance();
    }

    public function where( $column , $operator , $value ){ // where method  add a condition in query

        $column_value = $value;

        $data = $column;

        if( stripos( $column, '.',0 ) ){


            $data  = str_replace('.', '', $column);;

        }

        if( $start = stripos( $value, '.',0 ) ){ // if column come with table example table.column shoulb get only column .............

            $column_value =  substr( $value, $start+1 , strlen($value) );

        }

        if( !self::getTableColumn( $this->table , $column_value) ){ // check  if $value is not a column

            if ( self::check_key($data) ){

                $new_key = self::set_key( $data );

                $this->where =' where '.$column.' '.$operator.' :'.$new_key.'';

                $this->data[':'.$new_key] =  $value;

            }else{

                $this->where = ' where '.$column. ' ' .$operator.' '.':'.$data.'';

                $this->data[':'.$data] = $value;
            }
        }else{
            $this->where =' where '.$column.' '.$operator.' '.$value.'';
        }


        return self::end_instance();

    }

    public function like($column , $value){

        if ( self::check_key($column) ){

            $new_key = self::set_key( $column );

            $this->where = ' where '.$column.' like '.':'.$new_key.'';

            $this->data[':'.$new_key] = $value;

        }else{

            $this->where = ' where '.$column.' like '.':'.$column.'';

            $this->data[':'.$column] = $value;
        }

        return self::end_instance();

    }

    public function orLike($column , $value){

        if ( self::check_key($column) ){

            $new_key = self::set_key( $column );

            $this->where .= ' or '.$column.' like '.':'.$new_key.'';

            $this->data[':'.$new_key] = $value;

        }else{

            $this->where .= ' or '.$column.' like '.':'.$column.'';

            $this->data[':'.$column] = $value;
        }

        return self::end_instance();

    }

    public function andLike($column , $value){

        if ( self::check_key($column) ){

            $new_key = self::set_key( $column );

            $this->where .= ' and '.$column.' like '.':'.$new_key.'';

            $this->data[':'.$new_key] = $value;

        }else{

            $this->where .= ' and '.$column.' like '.':'.$column.'';

            $this->data[':'.$column] = $value;
        }

        return self::end_instance();

    }

    public function orWhere( $column , $operator , $value ){ // orwhere method add another alternativ to condition

        if ( self::check_key($column) ){

            $new_key = self::set_key( $column );

            $this->where.=' or '.$column.' '.$operator.' :'.$new_key.'';

            $this->data[':'.$new_key] = $value;

        }else{

            $this->where.= ' or '.$column. ' ' .$operator.' '.':'.$column.'';

            $this->data[':'.$column] = $value;
        }

        return self::end_instance();

    }

    public function andWhere( $column , $operator , $value ){ // andwhere method add anothercondition in query .........

        $column_value = $value;

        $data = $column;

        if( stripos( $column, '.',0 ) ){


            $data  = str_replace('.', '', $column);;

        }

        if( $start = stripos( $value, '.',0 ) ){ // if column come with table example table.column shoulb get only column .............

            $column_value =  substr( $value, $start+1 , strlen($value) );

        }

        if( !self::getTableColumn( $this->table , $column_value) ){ // check  if $value is not a column



            if ( self::check_key($data) ){

                $new_key = self::set_key( $data );

                $this->where .=' and '.$column.' '.$operator.' :'.$new_key.'';

                $this->data[':'.$data] = $value;

            }else{

                $this->where .= ' and '.$column. ' ' .$operator.' '.':'.$data.'';

                $this->data[':'.$data] = $value;
            }
        }else{
            $this->where .=' and '.$column.' '.$operator.' '.$value.'';
        }


        return self::end_instance();
    }

    public function groupBy(){

        $arg_list = func_get_args();

        $this->groupby =' group by '. implode( ',', $arg_list );

        return self::end_instance();

    }

    public function having( $column , $operator , $value ){

        if ( self::check_key($column) ){

            $new_key = self::set_key( $column );

            $this->having =' having '.$column.' '.$operator.' :'.$new_key.'';

            $this->data[':'.$new_key] = $value;

        }else{

            $this->having =' having '.$column. ' ' .$operator.' :'.$column.'';

            $this->data[':'.$column] = $value;
        }

        return self::end_instance();



    }

    public function orHaving( $column , $operator , $value ){


        if ( self::check_key($column) ){

            $new_key = self::set_key( $column );

            $this->having .=' or '.$column.' '.$operator.' :'.$new_key.'';

            $this->data[':'.$new_key] = $value;

        }else{

            $this->having .=' or '.$column. ' ' .$operator.' :'.$column.'';

            $this->data[':'.$column] = $value;
        }

        return self::end_instance();



    }

    public function andHaving( $column , $operator , $value ){


        if ( self::check_key($column) ){

            $new_key = self::set_key( $column );

            $this->having .=' and '.$column.' '.$operator.' :'.$new_key.'';

            $this->data[':'.$new_key] = $value;

        }else{

            $this->having .=' and '.$column. ' ' .$operator.' :'.$column.'';

            $this->data[':'.$column] = $value;
        }

        return self::end_instance();



    }

    public function havingCount( $column , $operator , $value ){


        if ( self::check_key($column) ){

            $new_key = self::set_key( $column );

            $this->having =' having count('.$column.') '.$operator.' :'.$new_key.'';

            $this->data[':'.$new_key] = $value;

        }else{

            $this->having =' having count('.$column.') ' .$operator.' :'.$column.'';

            $this->data[':'.$column] = $value;
        }

        return self::end_instance();


    }

    public function orHavingCount( $column , $operator , $value ){


        if ( self::check_key($column) ){

            $new_key = self::set_key( $column );

            $this->having .=' or count('.$column.') '.$operator.' :'.$new_key.'';

            $this->data[':'.$new_key] = $value;

        }else{

            $this->having .=' or count('.$column.') ' .$operator.' :'.$column.'';

            $this->data[':'.$column] = $value;
        }

        return self::end_instance();


    }

    public function andHavingCount( $column , $operator , $value ){


        if ( self::check_key($column) ){

            $new_key = self::set_key( $column );

            $this->having .=' and count('.$column.') '.$operator.' :'.$new_key.'';

            $this->data[':'.$new_key] = $value;

        }else{

            $this->having .=' and count('.$column.') ' .$operator.' :'.$column.'';

            $this->data[':'.$column] = $value;
        }

        return self::end_instance();


    }

    public function orderBy(){

        $arg_list = func_get_args();

        $desc_or_asc ='';

        $key='';

        if( is_numeric( $key = array_search( 'DESC', $arg_list ) )  ){ // if exists DESC in arguments .......

            array_splice( $arg_list, $key , 1); // remove DESC  from array

            $desc_or_asc = 'DESC';

        }



        if(  is_numeric( $key = array_search( 'ASC', $arg_list ) ) ){ // if exists ASC in arguments .....

            array_splice( $arg_list, $key , 1); // remove DESC  from array

            $desc_or_asc = 'ASC';

        }


        $this->orderby .=' order by '. implode( ',', $arg_list ).' '. $desc_or_asc;

        return self::end_instance();

    }

    public function limit( $startrow , $rows ){


        $this->limit ='limit :startrow, :rows';

        $this->data[':startrow'] = $startrow;

        $this->data[':rows'] = $rows;

        return self::end_instance();

    }

    public function timeStampDiff( $type , $column , $operator , $value ){

        if ( self::check_key($column) ){

            $new_key = self::set_key( $column );

            $this->where =' where TIMESTAMPDIFF('.$type.' , '.$column.' , NOW() ) ' .$operator. ' :'.$new_key.' ';

            $this->data[':'.$new_key] =  $value;

        }else{

            $this->where =' where TIMESTAMPDIFF('.$type.' , '.$column.' , NOW() ) ' .$operator. ' :'.$column.' ';

            $this->data[':'.$column] = $value;
        }

        return self::end_instance();

    }

    public function orTimeStampDiff( $type , $column , $operator , $value ){

        if ( self::check_key($column) ){

            $new_key = self::set_key( $column );

            $this->where .=' or TIMESTAMPDIFF('.$type.' , '.$column.' , NOW() ) ' .$operator. ' :'.$new_key.' ';

            $this->data[':'.$new_key] =  $value;

        }else{

            $this->where .=' or TIMESTAMPDIFF('.$type.' , '.$column.' , NOW() ) ' .$operator. ' :'.$column.' ';

            $this->data[':'.$column] = $value;
        }

        return self::end_instance();

    }

    public function andTimeStampDiff( $type , $column , $operator , $value ){

        if ( self::check_key($column) ){

            $new_key = self::set_key( $column );

            $this->where .=' and TIMESTAMPDIFF('.$type.' , '.$column.' , NOW() ) ' .$operator. ' :'.$new_key.' ';

            $this->data[':'.$new_key] =  $value;

        }else{

            $this->where .=' and TIMESTAMPDIFF('.$type.' , '.$column.' , NOW() ) ' .$operator. ' :'.$column.' ';

            $this->data[':'.$column] = $value;
        }

        return self::end_instance();

    }

    public function delete(){

        $this->select = false;

        $this->delete = 'delete';

        self::build_prepare( self::end_instance());

        self::execute();

        return self::end_instance();


    }

    public function insert( $data ){  // $data must be a array with columns name of table as keys and values as values

        $columns = '';

        $values = '';

        $multi_array = false;


        if( is_array( $data ) ){ // check if param is array .............

            foreach ( $data as $key => $value ) { // loop array

                if( is_array( $value ) ){ // check if any index in this array  is also array .............

                    $multi_array = true;

                    foreach ( $value as $keyitem => $valueitem) {

                        $this->data[':'.$keyitem] = $valueitem;

                    }

                    self::execute_insert( $value , $this->data );

                }

                else{

                    $this->data[':'.$key] = $value;

                }

            }

            if( $multi_array == false ){

                self::execute_insert( $data , $this->data );

            }

        }

        else{ // param is not array new expetion  caouse this method accpet only array param.....................


            throw new Exception("insert method accept only array data", 1);

        }

    }

    public function update( $data ){ // get a array with column names as key and value ...........

        $set = '';

        if( is_array( $data ) ){

            foreach ( $data as $key => $value ) {

                $this->data[':'.$key] = $value;

                if( empty($set) ){

                    $set .= $key.' = '.':'.$key;

                }else{

                    $set .=' , '.$key.' = '.':'.$key;
                }

            }

            $this->update = "update ".$this->table.' set '.$set.' '.$this->where;

            $this->prepare =  $this->update;

            self::execute();

            return  $this->prepare;


        }else{

            throw new Exception("update method accept only array param", 1);

        }

    }

    public function execute_insert( $columns , $values ){


        $columnss = implode( ", ", array_keys( $columns ) );

        $valuess = implode( ", ", array_keys(  $values ) );

        $this->insert = "insert into ".$this->table. "( ".$columnss." ) values ( ".$valuess." )";

        $this->prepare = $this->insert;

        self::execute();

    }

    public function check_key($column){

        if ( array_key_exists( ':'.$column.'', $this->data ) ){

            return true;

        }else{

            return false;
        }

    }

    public function set_key($column){

        $new_key ='';

        for( $i= 0 ; $i < count($this->data) ; $i++ ){

            if( !array_key_exists(':'.$column.$i, $this->data ) ){

                $new_key = $column.$i;

                break;

            }

        }

        return $new_key;

    }

    public function if_empty_select(){

        if( $this->select == 'select' ){

            return true;

        }else{
            return false;
        }

    }

    public function set_select_operators( $arg_list , $type_operator){

        $i = 0;

        if( self::if_empty_select() ){

            if( count($arg_list) != 0 ){

                foreach ( $arg_list as $key => $column ) {

                    if( strpos($column , '.') !== false ){

                        $column_replace = str_replace('.', '_', $column);

                        if( $i >= 1 ){

                            $this->select .=','.$type_operator.'('.$column.') as '.$type_operator.'_'.$column_replace;
                            $i++;
                            continue;
                        }

                        $this->select .= $type_operator.'('.$column.') as '.$type_operator.'_'.$column_replace;

                        $i++;

                    }else{

                        if( $i >= 1 ){

                            $this->select .=','.$type_operator.'('.$column.') as '.$type_operator.'_'.$column;
                            $i++;
                            continue;
                        }

                        $this->select .= $type_operator. ' ('.$column.') as '.$type_operator.'_'.$column;

                        $i++;
                    }

                }

            }else{

                $this->select .=' count(*) as count';
            }


        }else{

            if( count($arg_list) != 0 ){

                foreach ( $arg_list as $key => $column ) {

                    if( strpos($column , '.') !== false ){

                        $column_replace = str_replace('.', '_', $column);

                        $this->select .=','.$type_operator.'('.$column.') as '.$type_operator.'_'.$column_replace;

                    }else{
                        $this->select .=','.$type_operator.'('.$column.') as '.$type_operator.'_'.$column;
                    }

                }

            }else{
                $this->select .=',count(*) as count';
            }
        }
    }

    public function whereExists( $function ){

        self::generic_instance( __FUNCTION__ );

        $function( self::end_instance() );

        $prepare_subquery = self::build_prepare( self::end_instance() );

        $data = self::end_instance()->data;

        self::delete_instance( __FUNCTION__ );

        $this->data = $data;

        $this->where.='where Exists ('.$prepare_subquery.')';

        return self::end_instance();

    }

    public function whereIn( $column , $data ){ // function as parameter   or    column , operator , value ................

        if( is_callable( $data ) ){

            self::generic_instance( __FUNCTION__ ); // generate a new instance for this class

            $data( self::end_instance() ); // exe function that come in this method function

            $prepare_subquery = self::build_prepare( self::end_instance() );

            $data = self::end_instance()->data;

            self::delete_instance( __FUNCTION__ ); // delete last instance ..........

            $this->data = $data;

            $this->where.='where '.$column.' in ('.$prepare_subquery.')'; // add subquery in query

        }else if( is_array($data) ){ // if is array

            $valueIn = implode(',',$data);

            $this->where.='where '.$column.' in ('.$valueIn.')';
        }else{

            throw new Exception(__FUNCTION__ .' method accept data as function or array ');
        }

        return self::end_instance();
    }

    public function whereNotIn(){


    }

    public function setDataInlastInstance(){

    }

    public function get(){

        if( self::if_empty_select() ){

            $this->select .= ' * ';
        }

        self::build_prepare( self::end_instance() );

        return self::execute();

    }

    public function build_prepare( $instance ){ // build prepare query without data

        $instance->prepare =
            $instance->delete.' '.
            $instance->select.' '.
            $instance->from.' '.
            $instance->where.' '.
            $instance->groupby.' '.
            $instance->having.' '.
            $instance->orderby.' '.
            $instance->limit;

        return $instance->prepare;

    }

    public static function getTableColumn( $table , $column ) {

        $query  = self::conn()->prepare("SHOW COLUMNS FROM $table LIKE '".$column."' ");
        try{
            $query->execute();

            if( $query->fetchColumn() ) {
                return 1;
            }
            else{
                return 0;
            }

        }catch(PDOException $e){die($e->getMessage());}
    }

    public function execute(){ // execute query

        $query =self::conn()->prepare( $this->prepare );

        foreach ( $this->data as $key => &$value ){

            if(is_numeric($value)){

                $query->bindParam( $key, $value , PDO::PARAM_INT );

             }else{
                 $query->bindParam( $key, $value , PDO::PARAM_STR );
             }

        }
        $query->execute();

        $result = $query->fetchAll(\PDO::FETCH_ASSOC );

        return  $result;
    }

}


?>