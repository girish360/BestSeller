<?php
if(!session_id()){
	session_start();
}

$user=new user();

if(isset($_GET['email'])){
	
	$email=mysql_real_escape_string($_GET['email']);
	$ema=$user->checkuse($email);
	if($ema=='1'){
    echo $ema;
	}
	else{
    $json = json_encode($ema);

	echo $json;
	}
	

}
if(isset($_GET['pass'])){
	$pass=mysql_real_escape_string($_GET['pass']);
	$respass=$user->chechkuserpass($pass);
	if($respass==true){
		//header
	}
	else{
		echo $error=1;
	}
}
if(isset($_GET['arraydatauser'])){
	$array=$_GET['arraydatauser'];
	$res=$user->registeruser($array);
	if($res==true){
       echo'true';
	}
	else{
       echo'false';
	}

	
}
if(isset($_GET['checkemail'])){ // check email in databse if exsists  for company 
	$array=$_GET['checkemail'];
	$res=$user->checkemail($array);
	if($res==true){
       echo'true';
	}
	else{
       echo'false';
	}

	
}
if(isset($_GET['password'])&& isset($_GET['eemail'])){
	$pass=mysql_real_escape_string($_GET['password']);
	$email=mysql_real_escape_string($_GET['eemail']);

	$respass=$user->checkpass($pass,$email);
    if($respass==true){

       echo'true';
       
    }
    if($respass==false){
       echo'false';
    }
   
}


if(isset($_GET['emailforget'])){
	$email=$_GET['emailforget'];
	$res=$user->userforgetpassword($email);
	echo $res;

}

if(isset($_GET['key'])){
 $arrayconf=$_GET['key'];

 $confirmi=$user->confirmaccount($arrayconf);

 if($confirmi==true){
 	echo'1';
 }
 if($confirmi==false){
 	echo'0';
 }

}

if(isset($_GET['getdatauser'])){

   if(isset($_SESSION['datauser'])){
		$data=$_SESSION['datauser'];
		
		echo $data['email'];
	}
}

if(isset($_GET['accbusinessstep1'])&& isset($_GET['accbusinessstep2'])){
    $arr1step1=$_GET['accbusinessstep1']; // array with value step one in sing up bussiness account ....
    $arr2step2=$_GET['accbusinessstep2']; // array with value step two in sing up bussoness account .....
    $resultati = $user->registeraccountbusiness($arr1step1,$arr2step2); // call the method  register in database this company .......
    echo $resultati;
 }

 if(isset($_GET['confirm']) && !empty($_GET['confirm']) && isset($_GET['array1'])){
    $confirm_code=$_GET['confirm'];
    if($confirm_code=='confirmcode'){
    	$email=$_GET['array1'];
    	foreach($email as $key=>$value){
    		echo $value;
    	}
    	$res=$user->put_confirm_code($email['1']);

    	if($res==true){
    		echo 'ok';
    	}
    	
    }

 }

class user{

    private $dbHost     = "localhost";
    private $dbUsername = "root";
    private $dbPassword = "";
    private $dbName     = "world_sell";
	private $userTbl    = 'users';
    public $datauser;
    
    public function __construct(){
		
		if(!isset($this->db)){
            // Connect to the database
            $conn = new mysqli($this->dbHost, $this->dbUsername, $this->dbPassword, $this->dbName);
            if($conn->connect_error){
                die("Failed to connect with MySQL: " . $conn->connect_error);
            }else{
                $this->db = $conn;
            }
        }
	}
    public function checkuse($query){
       
		$sql=$this->db->query("SELECT * from users where email='$query'");

		if($sql->num_rows > 0){
			$result=$sql->fetch_assoc();
			$name=$result['first_name'];
			$last=$result['last_name'];
			$picture=$result['picture'];
			$email=$result['email'];
			$phone=$result['phone'];
			$lenpicturs=strlen($picture);
		
			if($lenpicturs>=15){
			    $array = array('emri'=>$name,'mbiemri'=>$last,'foto'=>$picture,'email'=>$email,'phone'=>$phone);
			    $data=user::getdata($array);
			    $_SESSION['datauser']=$data;
			    return $data;
			  
			}
			else{
				$photo='images/'.$picture;
                $array = array('emri'=>$name,'mbiemri'=>$last,'foto'=>$photo,'email'=>$email ,'phone'=>$phone);
			    $data=user::getdata($array);
			    $_SESSION['datauser']=$data;
			    return $data;
			}
		}
		else{
			$data='1';
			return $data;
		}
			
			
       
	}
	 public function getdata($array){
       return $this->datauser=$array;

    }
    
	public function chechkuserpass($pass){

		$query=$this->db->query("SELECT * from users where password='$pass'");

		if($query->num_rows==1){
            return true;
		}
		else{
			return false;
		}

	}
	public function registeruser($userdataarray=array()){

	  $query=$this->db->query("SELECT email from users where email='".$userdataarray['1']."'");
	  $result=$query->num_rows;
	  if($result==1){
	  
        return false;
	  }
	  else{
	  	
	  	  $sql=$this->db->query("INSERT into users (first_name,email,password,picture)values('".$userdataarray['0']."','".$userdataarray['1']."','".$userdataarray['2']."','".$userdataarray['3']."')");

	  	
           $resu=user::riderect($userdataarray);

           return $resu;
       }
      
   }
   public function checkemail($array = array()){
   	  $query=$this->db->query("SELECT emai from adminat where emai='".$array['1']."'");
	  $result=$query->num_rows;
	  if($result==1){
	  
        return false;
	  }
	  else{
	  	return true;
	  }
   }
	public function riderect($array=array()){
		
        $sql=$this->db->query("SELECT id from users where email='".$array['1']."'");
        $count=$sql->num_rows;
        if($count==1){
           $result=$sql->fetch_assoc();
           $id=$result['id'];
           session_start();
           $_SESSION['id']=$id;
           return true;
        }
	}

	public function checkpass($pass,$em){
         
		$query=$this->db->query("SELECT * from users where email='".$em."'");
		
		if(mysqli_num_rows($query)==1){
			$res=$query->fetch_assoc();
			$password=$res['password'];
			$id=$res['id'];
			if($password==$pass){
			  
			   $us=user::getsession($id);

               return true;
			}
			else{
				
				return false;
			}
		}
		else{
			
			return false;
		}
	}
    public function checkUser($userData = array()){
		if(!empty($userData)){
			// Check whether user data already exists in database
			$prevQuery = "SELECT * FROM ".$this->userTbl." WHERE oauth_provider = '".$userData['oauth_provider']."' AND oauth_uid = '".$userData['oauth_uid']."'";
			$prevResult = $this->db->query($prevQuery);
			if($prevResult->num_rows > 0){
				// Update user data if already exists
				$query = "UPDATE ".$this->userTbl." SET first_name = '".$userData['first_name']."', last_name = '".$userData['last_name']."', email = '".$userData['email']."', gender = '".$userData['gender']."', locale = '".$userData['locale']."', picture = '".$userData['picture']."', link = '".$userData['link']."', modified = '".date("Y-m-d H:i:s")."' WHERE oauth_provider = '".$userData['oauth_provider']."' AND oauth_uid = '".$userData['oauth_uid']."'";
				$update = $this->db->query($query);
			}else{
				// Insert user data
				$query = "INSERT INTO ".$this->userTbl." SET oauth_provider = '".$userData['oauth_provider']."', oauth_uid = '".$userData['oauth_uid']."', first_name = '".$userData['first_name']."', last_name = '".$userData['last_name']."', email = '".$userData['email']."', gener = '".$userData['gender']."', local = '".$userData['locale']."', picture = '".$userData['picture']."', link = '".$userData['link']."', created = '".date("Y-m-d H:i:s")."', modified = '".date("Y-m-d H:i:s")."'";
				$insert = $this->db->query($query);
			}
			
			// Get user data from the database
			$result = $this->db->query($prevQuery);
			$userData = $result->fetch_assoc();
		}
		
		// Return user data
		return $userData;
	}
	public function userforgetpassword($email){
     
       $conf=mt_rand();
       $confirmcode=substr($conf,0,6);
      
       $this->db->query("UPDATE users set confirm_account='$confirmcode' where email='$email'");
       if(mysqli_affected_rows() >= 0){
            // send email 
       $to = $email;
       $subject = "'".$confirmcode."' is your World's sell account recovery code";
       $message = "
       <html>
       <head> 
       <title> '".$confirmcode."' is your World's sell account recovery code</title>
       </head>
       <body>
       <p> This code is for confirm your account '".$confirmcode."'</p>

       <p>Or you can click button Confirm</p><br>
       <a href='localhost/shitble/login/changepassword.php'>Confrim your account</a>

     
       </body>
       </html>";

       // Always set content-type when sending HTML email
       $headers = "MIME-Version: 1.0" . "\r\n";
       $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

       // More headers
       $headers .= 'From: <klodi282011@gmail.com>' . "\r\n";
       $headers .= 'Cc: klodi282011@gmail.com' . "\r\n";

        mail($to,$subject,$message,$headers);
       
        return true;
       
      
       }
       else{
        return false;
       }

   
       
	}

	public function confirmaccount($array = array()){
         //$array[0] is email userit
		//$arrayp[1] is code confirm account

		$sql=$this->db->query("SELECT id from users where  confirm_account='".$array['1']."' and email='".$array['0']."'");
        $count=$sql->num_rows;
		if($count==1){

			$resu=$sql->fetch_assoc();
            $id=$resu['id'];
            $use=new user();

			$use::getsession($id);
			return true;
		}
		else{
			return false;
		}
	}


	public function getsession($id){
           $_SESSION['id']=$id;
	}

	public function registeraccountbusiness($array1 , $array2){
          if (count($array1)==0 && count($array2)==0){
          	  $res = 'nuk ka vlera vektori';
              return $res;
          }
          else{
              $this->db->query("INSERT INTO adminat  set name_company='".$array1['0']."' , emai='".$array1['1']."' , password='".$array1['2']."' , imageprofile='".$array1['3']."' , latitude='".$array2['0']."' , longitude='".$array2['1']."' , type_industry='".$array2['2']."' , street_adress='".$array2['3']."', city='".$array2['4']."' , state='".$array2['5']."' , phone_number='".$array2['6']."'") ;
          }
	}

	public function put_confirm_code($email){
	   $use=new user();
       $res=$use::randon_code();
       $this->db->query("UPDATE adminat set confirm_account='".$res."' where emai='".$email."'");
       $sendemail=$use::send_email_confirm_create_account_bussiness($email,$res);
       return $sendemail;
	}

	public function randon_code(){
	   $rand=mt_rand();
       $random_6=substr($rand,0,6);
       return $random_6;
	}

	public function send_email_confirm_create_account_bussiness($email,$rand){
         

       $to = $email;
       $subject = "'".$rand."' is your World's sell account verify code";
       $message = "
       <html>
       <head> 
       <title> '".$rand."' is your World's sell account verify code</title>
       </head>
       <body>
       <p> This code is for confirm your account '".$rand."'</p>

       <p>Or you can click button Confirm</p><br>
       <a href='localhost/shitble/login/changepassword.php'>Confrim your account</a>

     
       </body>
       </html>";

       // Always set content-type when sending HTML email
       $headers = "MIME-Version: 1.0" . "\r\n";
       $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

       // More headers
       $headers .= 'From: <klodi282011@gmail.com>' . "\r\n";
       $headers .= 'Cc: klodi282011@gmail.com' . "\r\n";

        mail($to,$subject,$message,$headers);
        return true;
	}

	
}

?>