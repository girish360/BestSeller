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

	public function run_query($script){

		$res=$this->db->query($script);
        return $res;

	}
}

?>