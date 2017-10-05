<?php 
session_start(); 
if(isset($_SESSION['id']) || isset($_SESSION['fb_id'])){
	echo '0';
}
else{
	echo '1';
}


?>